import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from datetime import datetime
import requests
import json
import numpy as np
import smtplib 
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import time

# Code to notify the user about the purchase
def notify(seller,buyer):
    
    
    doc_ref = db.collection(u'User_Info')
    query = doc_ref.where(u'uid', u'==', seller)
    
    for document in query.stream():
        seller_email = document.to_dict()['Email']
        
    doc_ref = db.collection(u'User_Info')
    query = doc_ref.where(u'uid', u'==', buyer)
    
    for document in query.stream():
        buyer_email = document.to_dict()['Email']
    
    
    email = "yash.gupta1999.mail@gmail.com"
    pas = "**************" #pasword for accessing gmail
    smtp = "smtp.gmail.com" 
    port = 587
    server = smtplib.SMTP(smtp,port)
    server.starttls()
    server.login(email,pas)
    
    
    msg = MIMEMultipart()
    msg['From'] = email
    msg['To'] = seller_email
    msg['Subject'] = "Posting"
    body = "Your energy sale has gone through successfully.\n Your new balance is "+ str(db.collection(u'Wallet').document(seller).get().to_dict()['Wallet'])

    msg.attach(MIMEText(body, 'plain'))
    sms = msg.as_string()
    server.sendmail(email,seller_email,sms)
    
    msg = MIMEMultipart()
    msg['From'] = email
    msg['To'] = buyer_email
    msg['Subject'] = "Transaction"
    body = "Your energy bidding has gone through successfully.\n Your new balance is "+ str(db.collection(u'Wallet').document(buyer).get().to_dict()['Wallet'])
    msg.attach(MIMEText(body, 'plain'))
    sms = msg.as_string()
    server.sendmail(email,buyer_email,sms)
    
    server.quit()

cred = credentials.Certificate("helius.json")
firebase_admin.initialize_app(cred)
db = firestore.client()
url = 'http://127.0.0.1:8002/new_transaction'

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
            author = "AUTO_BID"
            buyer = db.collection(u'Bids').document(post[i]).get().to_dict()['uid']
            seller = db.collection(u'Postings').document(post[i]).get().to_dict()['Owner']
            amount = db.collection(u'Bids').document(post[i]).get().to_dict()['Amount']

            j_data = json.dumps({'author':author,'buyer':buyer,'seller':seller,'quantity':amount})
            headers = {'content-type': 'application/json', 'Accept-Charset': 'UTF-8'}

            r = requests.post(url, data=j_data, headers=headers)
            
            if(str(r).split(' ')[1][1:4]=="200"):
#             update Wallets
                seller_wallet = db.collection(u'Wallet').document(seller).get().to_dict()['Wallet']
                buyer_wallet = db.collection(u'Wallet').document(buyer).get().to_dict()['Wallet']
                db.collection(u'Wallet').document(buyer).update({'Wallet':buyer_wallet-amount})
                db.collection(u'Wallet').document(seller).update({'Wallet':seller_wallet+amount})
                notify(seller,buyer)
                db.collection(u'Postings').document(post[i]).delete()
                db.collection(u'Bids').document(post[i]).delete()
            #launch a thread to complete the traction
            print("time to service")
    time.sleep(10)