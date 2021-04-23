import datetime
import json

import requests
from flask import render_template, redirect, request

from app import app

# The node with which our application interacts, there can be multiple
# such nodes as well.
CONNECTED_NODE_ADDRESS = "http://127.0.0.1:8000"

posts = []
peer = []


def fetch_posts():
    """
    Function to fetch the chain from a blockchain node, parse the
    data and store it locally.
    """
    get_chain_address = "{}/chain".format(CONNECTED_NODE_ADDRESS)
    response = requests.get(get_chain_address)
    if response.status_code == 200:
        content = []
        chain = json.loads(response.content)
        for block in chain["chain"]:
            for tx in block["transactions"]:
                tx["index"] = block["index"]
                tx["hash"] = block["previous_hash"]
                content.append(tx)

        peerContent = []
        for peers in chain["peers"]:
            peerContent .append(peers)

        global posts
        global peer
        posts = sorted(content, key=lambda k: k['timestamp'],
                       reverse=True)
        peer = peerContent


@app.route('/')
def index():
    fetch_posts()
    return render_template('index.html',
                           title='YourNet: Decentralized '
                                 'content sharing',
                           posts=posts,
			   peer = peer, 
                           node_address=CONNECTED_NODE_ADDRESS,
                           readable_time=timestamp_to_string)


@app.route('/submit', methods=['POST'])
def submit_textarea():
    """
    Endpoint to create a new transaction via our application.
    """
    post_content = request.form["content"]
    author = request.form["author"]

    post_object = {
        'author': author,
        'content': post_content,
    }

    # Submit a transaction
    new_tx_address = "{}/new_transaction".format(CONNECTED_NODE_ADDRESS)

    requests.post(new_tx_address,
                  json=post_object,
                  headers={'Content-type': 'application/json'})

    return redirect('/')

@app.route('/mine', methods=['POST', 'GET'])
def mining():
    new_tx_address = "{}/mine".format(CONNECTED_NODE_ADDRESS)

    requests.get(new_tx_address,
                  headers={'Content-type': 'application/json'})

    print("App server requesting mining")

    return redirect('/')

@app.route('/test1', methods=['POST'])
def submit_test1():
    post_content = request.form["node_address"]

    post_object = {
        'node_address': post_content
    }

    # Submit a transaction
    new_tx_address = "{}/register_with".format(CONNECTED_NODE_ADDRESS)

    result = requests.post(new_tx_address,
                  json=post_object,
                  headers={'Content-type': 'application/json'})

    return redirect('/')

def timestamp_to_string(epoch_time):
    return datetime.datetime.fromtimestamp(epoch_time).strftime('%H:%M')
