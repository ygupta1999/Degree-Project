from hashlib import sha256
import json
import time
import requests
from flask import Flask, request, redirect, url_for, flash, jsonify, make_response
import numpy as np
import pickle as p
import tensorflow as tf
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from math import *
from geopy.geocoders import Nominatim
import pandas as pd   
from datetime import date, timedelta
from datetime import datetime
from keras import backend as K
import socket

from flask_cors import CORS

portNumber = 8000


class Block:
    def __init__(self, index, transactions, timestamp, previous_hash, nonce=0):
        self.index = index
        self.transactions = transactions
        self.timestamp = timestamp
        self.previous_hash = previous_hash
        self.nonce = nonce

    def compute_hash(self):
        """
        A function that return the hash of the block contents.
        """
        block_string = json.dumps(self.__dict__, sort_keys=True)
        return sha256(block_string.encode()).hexdigest()


class Blockchain:
    # difficulty of our PoW algorithm
    difficulty = 2

    def __init__(self):
        self.unconfirmed_transactions = []
        self.chain = []

    def create_genesis_block(self):
        """
        A function to generate genesis block and appends it to
        the chain. The block has index 0, previous_hash as 0, and
        a valid hash.
        """
        genesis_block = Block(0, [], 0, "0")
        genesis_block.hash = genesis_block.compute_hash()
        self.chain.append(genesis_block)

    @property
    def last_block(self):
        return self.chain[-1]

    def add_block(self, block, proof):
        """
        A function that adds the block to the chain after verification.
        Verification includes:
        * Checking if the proof is valid.
        * The previous_hash referred in the block and the hash of latest block
          in the chain match.
        """
        previous_hash = self.last_block.hash

        if previous_hash != block.previous_hash:
            return False

        if not Blockchain.is_valid_proof(block, proof):
            return False

        block.hash = proof
        self.chain.append(block)
        return True

    @staticmethod
    def proof_of_work(block):
        """
        Function that tries different values of nonce to get a hash
        that satisfies our difficulty criteria.
        """
        block.nonce = 0

        computed_hash = block.compute_hash()
        while not computed_hash.startswith('0' * Blockchain.difficulty):
            block.nonce += 1
            computed_hash = block.compute_hash()

        return computed_hash

    def add_new_transaction(self, transaction):
        print("Adding new message, not yet mined")
        self.unconfirmed_transactions.append(transaction)

    @classmethod
    def is_valid_proof(cls, block, block_hash):
        """
        Check if block_hash is valid hash of block and satisfies
        the difficulty criteria.
        """
        return (block_hash.startswith('0' * Blockchain.difficulty) and
                block_hash == block.compute_hash())

    @classmethod
    def check_chain_validity(cls, chain):
        result = True
        previous_hash = "0"

        for block in chain:
            block_hash = block.hash
            # remove the hash field to recompute the hash again
            # using `compute_hash` method.
            delattr(block, "hash")

            if not cls.is_valid_proof(block, block_hash) or \
                    previous_hash != block.previous_hash:
                result = False
                break

            block.hash, previous_hash = block_hash, block_hash

        return result

    def mine(self):
        """
        This function serves as an interface to add the pending
        transactions to the blockchain by adding them to the block
        and figuring out Proof Of Work.
        """
        if not self.unconfirmed_transactions:
            print("No messages to mine")
            return False

        last_block = self.last_block

        new_block = Block(index=last_block.index + 1,
                          transactions=self.unconfirmed_transactions,
                          timestamp=time.time(),
                          previous_hash=last_block.hash)

        proof = self.proof_of_work(new_block)
        self.add_block(new_block, proof)

        self.unconfirmed_transactions = []

        print("Mining complete")

        return True


app = Flask(__name__)
CORS(app)

# the node's copy of blockchain
blockchain = Blockchain()
blockchain.create_genesis_block()

# the address to other participating members of the network
peers = set()


# endpoint to submit a new transaction. This will be used by
# our application to add new data (posts) to the blockchain
@app.route('/new_transaction', methods=['POST'])
def new_transaction():
    tx_data = request.get_json()
    required_fields = ["author", "buyer", "seller", "quantity"]

    for field in required_fields:
        if not tx_data.get(field):
            return "Invalid transaction data", 404

    tx_data["timestamp"] = time.time()
    blockchain.add_new_transaction(tx_data)
    return (mine_unconfirmed_transactions())


# endpoint to return the node's copy of the chain.
# Our application will be using this endpoint to query
# all the posts to display.

#MARKO CHANGES
# used make_response and jsonify instead of dump
@app.route('/chain', methods=['GET'])
def get_chain():
    chain_data = []
    for block in blockchain.chain:
        chain_data.append(block.__dict__)
    #return jsonify({"length": len(chain_data),
    #                  "chain": chain_data,
    #                   "peers": list(peers)})
    #return json.dumps({"length": len(chain_data),
    #                   "chain": chain_data,
    #                   "peers": list(peers)})

    #json_data = flask.requests.json
    #a_value = json_data["a_key"]
    #return "JSON value sent: " + a_value

    res = make_response(jsonify({
    	"length": len(chain_data),
        "chain": chain_data,
        "peers": list(peers)}), 200)

    return res




# endpoint to request the node to mine the unconfirmed
# transactions (if any). We'll be using it to initiate
# a command to mine from our application itself.
@app.route('/mine', methods=['GET'])
def mine_unconfirmed_transactions():
    print("Starting mining")

    result = blockchain.mine()
    if not result:
        print("Cant find transactions to mine")
        return "No transactions to mine"
    else:
        # Making sure we have the longest chain before announcing to the network
        chain_length = len(blockchain.chain)
        if chain_length == len(blockchain.chain):
            # announce the recently mined block to the network
            announce_new_block(blockchain.last_block)
        return "Block #{} is mined.".format(blockchain.last_block.index)


# endpoint to add new peers to the network.
@app.route('/register_node', methods=['POST'])
def register_new_peers():
    node_address = request.get_json(force=True)["node_address"]
    if not node_address:
        return "Invalid data", 400

    # Add the node to the peer list
    peers.add(node_address)

    consensus()

    # Return the consensus blockchain to the newly registered node
    # so that he can sync
    return get_chain()



@app.route('/register_with', methods=['POST'])
def register_with_existing_node():
    """
    Internally calls the `register_node` endpoint to
    register current node with the node specified in the
    request, and sync the blockchain as well as peer data.
    """
    print("Requested Address of node: " + request.get_json()["node_address"])
    node_address = request.get_json()["node_address"]
    if not node_address:
        return "Invalid data", 400

    # The issue is this next line is returning 127.0.0.1:8000 instead of the actual IP address
    # Since it was designed to have the other host tell them to register itself, not the user tell
    # it to register an addgress
    import socket
    hostname = socket.gethostname()
    local_ip = socket.gethostbyname(hostname)
    data = {"node_address": local_ip + ":" + str(portNumber)}
    headers = {'Content-Type': "application/json"}

    # Make a request to register with remote node and obtain information
    response = requests.post("http://" + node_address + "/register_node",
                             data=json.dumps(data), headers=headers)

    if response.status_code == 200:
        global blockchain
        global peers
        # update chain and the peers
        chain_dump = response.json()['chain']
        blockchain = create_chain_from_dump(chain_dump)

        peers.update(response.json()['peers'])

        print("Peers Content: " + " ".join(peers))
        return "Registration successful", 200
    else:
        # if something goes wrong, pass it on to the API response
        return response.content, response.status_code


def create_chain_from_dump(chain_dump):
    generated_blockchain = Blockchain()
    generated_blockchain.create_genesis_block()
    for idx, block_data in enumerate(chain_dump):
        if idx == 0:
            continue  # skip genesis block
        block = Block(block_data["index"],
                      block_data["transactions"],
                      block_data["timestamp"],
                      block_data["previous_hash"],
                      block_data["nonce"])
        proof = block_data['hash']
        added = generated_blockchain.add_block(block, proof)
        if not added:
            raise Exception("The chain dump is tampered!!")
    return generated_blockchain


# endpoint to add a block mined by someone else to
# the node's chain. The block is first verified by the node
# and then added to the chain.
@app.route('/add_block', methods=['POST'])
def verify_and_add_block():
    block_data = request.get_json()
    block = Block(block_data["index"],
                  block_data["transactions"],
                  block_data["timestamp"],
                  block_data["previous_hash"],
                  block_data["nonce"])

    proof = block_data['hash']
    added = blockchain.add_block(block, proof)

    if not added:
        return "The block was discarded by the node", 400

    return "Block added to the chain", 201


# endpoint to query unconfirmed transactions
@app.route('/pending_tx')
def get_pending_tx():
    return json.dumps(blockchain.unconfirmed_transactions)


def consensus():
    """
    Our naive consnsus algorithm. If a longer valid chain is
    found, our chain is replaced with it.
    """
    global blockchain

    longest_chain = None
    current_len = len(blockchain.chain)

    for node in peers:
        response = requests.get("http://" + node + "/chain")
        length = response.json()['length']
        chain = response.json()['chain']
        if length > current_len and blockchain.check_chain_validity(chain):
            current_len = length
            longest_chain = chain

    if longest_chain:
        blockchain = longest_chain
        return True

    return False


def announce_new_block(block):
    """
    A function to announce to the network once a block has been mined.
    Other blocks can simply verify the proof of work and add it to their
    respective chains.
    """
    import socket
    hostname = socket.gethostname()
    local_ip = socket.gethostbyname(hostname)
    myIP = local_ip + ":" + str(portNumber)

    for peer in peers:
        if peer is not myIP:
            url = "http://{}/add_block".format(peer)
            headers = {'Content-Type': "application/json"}
            requests.post(url,
                          data=json.dumps(block.__dict__, sort_keys=True),
                          headers=headers)

def solar_radiation(lat,n,t,to,k,a):
    delta = 23.5*sin(radians(360*(284+n)/365))
    h = degrees(asin(cos(radians(lat))*cos(radians(delta))*cos(radians(15*(t-to))) + sin(radians(lat))*sin(radians(delta))))
    s = 1
    qo = (0.62+0.68)*sin(radians(h))
    A = degrees(asin((cos(radians(delta))*sin(radians(15*(t-to))))/cos(radians(h))))
    qr = qo*(1-0.38*(1+(k/10))*(k/10))
    q = qr*(cos(radians(a))*sin(radians(h)) + (sin(radians(a))*cos(radians(h))*cos(radians(A))))/sin(radians(h))
    return q
def pannel_area(n=1):
    length = 65*0.0254
    width = 39*0.0254
    return length*width*n

def solar_power(radiation,ambient_temp,panels=1,eff=0.2):
    efficiency = eff
    panel_area = pannel_area(panels)
    power = efficiency*panel_area*radiation*(1-0.005*(ambient_temp-25))
    return power
#generate time
def generate_time():
    time = []
    for i in range(240):
        time.append(i/10)
    return time

#get longitude and latitude
def latitude(address):
    geolocator = Nominatim(user_agent="my_user_agent")
    city ="Thunder Bay"
    country ="Canada"
    loc = geolocator.geocode(address+','+city+','+ country)
    return loc.latitude

def longitude(address):
    geolocator = Nominatim(user_agent="my_user_agent")
    city ="Thunder Bay"
    country ="Canada"
    loc = geolocator.geocode(address+','+city+','+ country)
    return loc.longitude

def get_day_number(date):
    days = [31,28,31,30,31,30,31,31,30,31,30,31]
    date = date.split("-")
    month = int(date[1])
    res = sum(days[:month-1])
    res = res + int(date[2])
    return res

def solar_noon(date,address):
    response = requests.get("https://api.sunrise-sunset.org/json?lat="+str(latitude(address)) + "&lng="+str(longitude(address))+"&date="+date)
    result = response.json()['results']['solar_noon'].split(' ')
    time = result[0].split(":")
    hour = int(time[0])
    if(hour<12 and result[1]=="PM"):
        hour = hour + 12
    hour = hour-5
    minute = round(int(time[1])/6)
    return hour+(minute/10)

def get_weather(w,date):
    x = w[w['Date']==date].index.tolist()
    temp = []
    for i in x:
        temp.append(w.iloc[i]['Temp (°C)'])
    x = np.arange(0,240,1)
    l = []
    t= 0
    for i in range(len(x)):
        if(i%10==0):
            l.append(temp[t])
            t = t+1
        else:
            l.append(np.nan)
    p = pd.DataFrame(l)
    p = p.interpolate(method ='linear', limit_direction ='both')
    temp = p[0]
    return temp


def get_solar_radiation(date,address):
    lat = latitude(address)
    to = solar_noon(date,address)
    n = get_day_number(date)
    k = 1
    a = 22.5
    t = generate_time()
    pred = []
    for i in t:
        res = solar_radiation(lat,n,i,to,k,a)
        if(res>0):
            pred.append(res)
        else:
            pred.append(0)
    return t,pred

def get_solar_power(temp,radiation,panels=1,eff=0.2):
    power = []
    for i in range(len(temp)):
        power.append(solar_power(radiation[i],temp[i],panels,eff))
    return power

def visualize(x,y):
    fig = plt.figure()
    fig.set_size_inches(9.5, 5.5)
    ax = plt.axes()
    ax.plot(x, y)

def gen_hourly_data(df,date,address):
    response = requests.get("https://api.sunrise-sunset.org/json?lat="+str(latitude(address)) + "&lng="+str(longitude(address))+"&date="+date)
    sunrise = int(utc_to_est(response.json()['results']['sunrise'])*10)
    sunset = int(utc_to_est(response.json()['results']['sunset'],True)*10)
    
    power = list(df['Power'])
    temp = power[sunrise:sunset]
    final = []
    for i in power:
        if(i in temp):
            final.append(i)
        else:
            final.append(0)
    power = final
    hourly = []
    for i in range(24):
        res = sum(power[10*i:10*(i+1)])
        hourly.append(res)
    return hourly,sunrise/10
def gen_solar(date,address,panels,eff):
    w = pd.read_csv('Weather.csv')
    temp = get_weather(w,date)
    t,pred = get_solar_radiation(date,address)
    power = get_solar_power(temp,pred,panels,eff)
    df = pd.DataFrame(t,columns =['Time'])
    df['Radiation'] = pred
    df['Power'] = power
    df = df.set_index(df.Time)
    df = df.drop('Time',axis=1)
    df,sunrise = gen_hourly_data(df,date,address)
    #crop time based on sunrise and sunset
    return df,sunrise
def utc_to_est(time,sunset=False):
    if(sunset==False):
        hour = int(time.split(":")[0])
        minute = int(int(time.split(":")[1])/6)
        ampm = time.split(" ")[1]
        if(hour<12 and ampm=='PM'):
            hour = hour+12-4
        else:
            hour = hour-4
    else:
        hour = int(time.split(":")[0])
        minute = int(int(time.split(":")[1])/6)
        ampm = time.split(" ")[1]
        if(hour<12 and ampm=='AM'):
            hour = hour+24-4
        else:
            hour = hour+12-4
    return hour+ minute*0.1

@app.route('/solar_production', methods=['POST'])
# @app.route("/")
def solar_production():
    json_ = request.json
    json_ = json_['author']
    doc_ref = db.collection(u'User_Info')
    query = doc_ref.where(u'uid', u'==', json_)

    for document in query.stream():
        info = document.to_dict()
    
    address = info['Address']
    panels = info['Panels']
    res1,sunrise = gen_solar("2016-2-12",address,panels,0.1)
    res2,x = gen_solar("2016-2-13",address,panels,0.1)
    res1,res2 = res1[round(sunrise):],res2[:round(sunrise)]
    res = []
    for i in res1:
        res.append(i)
    for i in res2:
        res.append(i)
        
    return jsonify(res)


@app.route('/solar_consumption', methods=['POST'])
# @app.route("/")
def solar_consumption():
    json_ = request.json
    json_ = json_['author']
    doc_ref = db.collection(u'User_Info')
    query = doc_ref.where(u'uid', u'==', json_)

    for document in query.stream():
        info = document.to_dict()
        
    model_id = info['model']
    
    data = pd.read_csv('Data Clean.csv')
    data['Timestamp'] = pd.to_datetime(data['Timestamp'],infer_datetime_format=True)
    df = data.set_index(['Timestamp'])
    df['No.'] = list(range(len(df)))
    d = '2016-2-12'
    address = "557 Beverly St"
    response = requests.get("https://api.sunrise-sunset.org/json?lat="+str(latitude(address)) + "&lng="+str(longitude(address))+"&date="+"2016-6-12")
    sunrise = int(utc_to_est(response.json()['results']['sunrise'])*10)
    start = df[df.index.hour.isin([round(sunrise/10)])][d]['No.'][0]
    x = np.array(data[start-24:start]['Total Power'].tolist()).reshape(24,-1)
    l = []
    l.append(x)
    l = np.array(l)
    model = tf.keras.models.load_model('lstm.h5')
    pred = model.predict(l)
    temp = []
    for i in pred[0]:
        temp.append(i[0])
    temp = np.array(temp)
    return jsonify(temp.tolist())

@app.route('/surplus', methods=['POST'])
# # @app.route("/")
def surplus():
    json_ = request.json
    json_ = json_['author']
    doc_ref = db.collection(u'User_Info')
    query = doc_ref.where(u'uid', u'==', json_)

    for document in query.stream():
        info = document.to_dict()
    
    address = info['Address']
    panels = info['Panels']
    res1,sunrise = gen_solar("2016-2-12",address,panels,0.1)
    res2,x = gen_solar("2016-2-13",address,panels,0.1)
    res1,res2 = res1[round(sunrise):],res2[:round(sunrise)]
    prod = []
    for i in res1:
        prod.append(i)
    for i in res2:
        prod.append(i)
    prod = np.array(prod)
    
    model_id = info['model']
    
    data = pd.read_csv('Data Clean.csv')
    data['Timestamp'] = pd.to_datetime(data['Timestamp'],infer_datetime_format=True)
    df = data.set_index(['Timestamp'])
    df['No.'] = list(range(len(df)))
    d = '2016-2-12'
    # address = "557 Beverly St"
    response = requests.get("https://api.sunrise-sunset.org/json?lat="+str(latitude(address)) + "&lng="+str(longitude(address))+"&date="+"2016-6-12")
    sunrise = int(utc_to_est(response.json()['results']['sunrise'])*10)
    start = df[df.index.hour.isin([round(sunrise/10)])][d]['No.'][0]
    x = np.array(data[start-24:start]['Total Power'].tolist()).reshape(24,-1)
    l = []
    l.append(x)
    l = np.array(l)
    model = tf.keras.models.load_model('lstm.h5')
    pred = model.predict(l)
    cons = []
    for i in pred[0]:
        cons.append(i[0])
    cons = np.array(cons)
    
    res = prod-cons
    if(sum(res)>0):
        l = 0
        index = 0
        for i in range(len(res)):
            if(sum(res[:i+1])>l):
                l = sum(res[:i+1])
                index = i
        t1 = list(range(24))
        sunrise = int(round(sunrise/10))
        t = []
        tlabels = []
        for i in t1[sunrise:]:
            t.append(i)
            tlabels.append(str(i)+":00")
        for i in t1[:sunrise]:
            t.append(i)
            tlabels.append(str(i)+":00")
            
        fin_time = str(t[index])+":00"
        return jsonify({"Time":fin_time,"Energy":sum(prod-cons),"Production":prod.tolist(),"Consumption":cons.tolist(),"Time_Labels":tlabels,"Message":"Surplus"})
    else:
        l = 0
        index = 0
        for i in range(len(res)):

            if(sum(res[:i+1])<0):
                l = sum(res[:i+1])
                index = i
                break
        t1 = list(range(24))
        sunrise = int(round(sunrise/10))

        t = []
        tlabels = []
        for i in t1[sunrise:]:
            t.append(i)
            tlabels.append(str(i)+":00")
        for i in t1[:sunrise]:
            t.append(i)
            tlabels.append(str(i)+":00")
        fin_time = str(t[index])+":00"
        return jsonify({"Time":fin_time,"Energy":sum(prod-cons),"Production":prod.tolist(),"Consumption":cons.tolist(),"Time_Labels":tlabels,"Message":"Deficit"})


@app.route('/validate_bid', methods=['Post'])
# # @app.route("/")
def validate_bid():
    json_ = request.json
    post_id = json_['Post_Id']
    uid = json_['uid']
    bid = json_['Amount']
    
    #check if valid bid 
    wallet_info = db.collection(u'Wallet').document(uid).get().to_dict()
            
    reservation_price = db.collection(u'Postings').document(post_id).get().to_dict()['ReservationValue']

    if(wallet_info['Wallet']>=int(bid) and int(bid)>=reservation_price):
        print("Bid is valid")
        doc_ref = db.collection(u'Bids').document(post_id)
        if(doc_ref.get().to_dict()==None):
            #first bid
            #code to add bid in the collection
            print("First Bid")
            db.collection(u'Bids').document(post_id).set({'Amount':bid,"uid":uid})

        else:
            bid_info = doc_ref.get().to_dict()
            if(bid_info['Amount']<int(bid)):
                print("New Bid is greater than old")
                #code for udpdating the bid for posting
                db.collection(u'Bids').document(post_id).update({'Amount':bid,"uid":uid})
    else:
        print("Invalid bid")

    return "Done"



if __name__ == '__main__':
    cred = credentials.Certificate("helius.json")
    firebase_admin.initialize_app(cred)
    db = firestore.client()
    # app.run(port=8000,debug=True)

# Uncomment this line if you want to specify the port number in the code
    
    print("Port to run node on: ")
    portNumber = input()
    hostname = socket.gethostname()
    local_ip = socket.gethostbyname(hostname)
    myIP = str(local_ip + ":" + str(portNumber))

    print(myIP)

    peers.add(myIP)

    app.run(debug=True, port=portNumber)