from flask import Flask, request, redirect, url_for, flash, jsonify
import json
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import requests
from datetime import datetime
#MARKO CHANGES
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

from flask import Flask, request, redirect, url_for, flash, jsonify, make_response
#MARKO CHANGES
from flask_cors import CORS





def checkBids():
    print("Starting bid checking thread")

    #Keep checking
    while(true):
        #Check the bids
        for each bid in Bids:


        #Wait before checking again
        time.sleep(15)




if __name__ == "__main__":
    format = "%(asctime)s: %(message)s"

    print("Main    : before creating thread")
    x = threading.Thread(target=thread_function, args=(1,))
    print("Main    : before running thread")
    x.start()
    print("Main    : wait for the thread to finish")
    # x.join()
    print("Main    : all done")