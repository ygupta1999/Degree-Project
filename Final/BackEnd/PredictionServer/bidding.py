import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from datetime import datetime
import requests
import json
import numpy as np
import time

cred = credentials.Certificate("helius.json")
firebase_admin.initialize_app(cred)
db = firestore.client()
# url = 'http://127.0.0.1:8008/new_transaction'
url = 'http://127.0.0.1:8003/new_transaction'

found= True
while(found):
    bids = db.collection(u'Bids').stream()
    postings = db.collection(u'Postings')
    now = datetime.now().strftime("%H:%M")
    post_time = []
    post = []
    for doc in bids:
        post_time.append(postings.document(str(doc.id)).get().to_dict()['Time'])
        post.append(postings.document(str(doc.id)).get().to_dict()['PostID'])
        json
    for i in range(len(post_time)):
        if(post_time[i]==now):

            #remove the posting
            author = "Daddy"
            buyer = db.collection(u'Bids').document(post[i]).get().to_dict()['uid']
            seller = db.collection(u'Postings').document(post[i]).get().to_dict()['Owner']
            amount = db.collection(u'Bids').document(post[i]).get().to_dict()['Amount']

#             j_data = json.dumps({'author':author,'buyer':buyer,'seller':seller,'quantity':amount})
#             headers = {'content-type': 'application/json', 'Accept-Charset': 'UTF-8'}

#             r = requests.post(url, data=j_data, headers=headers)
            #update Wallets
            seller_wallet = db.collection(u'Wallet').document(seller).get().to_dict()['Wallet']
            buyer_wallet = db.collection(u'Wallet').document(buyer).get().to_dict()['Wallet']
            db.collection(u'Wallet').document(buyer).update({'Wallet':buyer_wallet-amount})
            db.collection(u'Wallet').document(seller).update({'Wallet':seller_wallet+amount})

            
            db.collection(u'Postings').document(post[i]).delete()
            db.collection(u'Bids').document(post[i]).delete()
            #launch a thread to complete the traction
            print("time to service")
    time.sleep(30)