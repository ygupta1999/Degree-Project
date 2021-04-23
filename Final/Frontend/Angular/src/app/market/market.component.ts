import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

//From ex
import { ApiService } from '../services/api.service'; 
// from https://blog.logrocket.com/creating-a-crud-firebase-documents-in-angular/
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuthModule } from '@angular/fire/auth';


//TESTING
import { element } from 'protractor';
import {MatTableModule} from '@angular/material/table';
import { TestBed } from '@angular/core/testing';
import {MDCDataTable} from '@material/data-table';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';



//New rest stuff
import { RestApiService } from "../shared/rest-api.service";
import { snapshotChanges } from '@angular/fire/database';

//Theming
import {OverlayContainer} from '@angular/cdk/overlay';
import { DOCUMENT } from '@angular/common';
import { data, time } from '@tensorflow/tfjs';

import { IgxTimePickerModule } from "igniteui-angular";
//import { TimePickerSample1Component } from "./timepicker-sample-1/timepicker-sample-1.component";
import {formatDate} from '@angular/common';


//Interfaces for Objects
export interface Postings {
  user_name: string;
  Energy: number;
  ReservationValue: number;
}

export interface user {
  uid: string;
}

export interface test {
  length: number;
  chain: string;
  peers: string;
}

export interface bid {
  uid:  String;
  Post_Id: String;
  Amount: number;
}

export interface transaction {
  author: String;
  buyer:  String;
  seller: String;
  quantity: number;
  bidValue: number;
}

export interface port {
  node_ddress: String;
}


@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css'],
  //From Ex
  providers: [ApiService],
  template: 
  `
  <ul>
    <li *ngFor="let item of items | async">
      {{ item.name }}
    </li>
  </ul>
  <div >Sum of Production Array = {{ProductionArraySum}}</div>
  `
})
export class MarketComponent implements OnInit {
  
  //Firestore data reading/writing
  private itemCollection: AngularFirestoreCollection<Postings>;
  items: Observable<Postings[]> | undefined;
  Users: Observable<any>;
  
  //for HTTP stuff
  data: Observable<test[]> | undefined;
  number: test | undefined;
  walletValue: any | undefined;

  postings: Postings[] | undefined;

  //STABLE
  //Basic chain object
  Chain: any = [];
  

  displayedColumns = ['user_name',  'Energy', 'Bid',  'Bid Button'];
  dataSource: Observable<Postings[]> | any;
  dataDisplay: Observable<test[]> | undefined;

  //Production variables
  Production: any = [];
  Consumption: any = [];
  Surplus: any = [];

  //value = 'Enter Bid';
  
  /////////////////////////START DEVELOPMENT AND TESTING //////////////////////////////////////////
  
  //temp user
  parser = new DOMParser();

  testval = 0;
  currentUser = "rRhrdVZZrkQV4J4dijdtM38v7aC2";
  // uid = JSON.parse(window.localStorage.getItem('user'));
  // uid2 = ""
  //let obj = JSON.parse(current)
  //Basic date
  //myDate = new Date;


  today: number = Date.now();
  myDate: any = new Date();


  //URL Links
  //readonly ROOT_URL = "https://jsonplaceholder.typicode.com"
  //readonly SERVER_URL = "http://127.0.0.1:8000"
  //dataTest:Observable<any[]>;
  //buttonTest = '1';
  ProductionArraySum: number[] = [];
  testBuy: String = "";


  /////Dynamic form stuff
  name = new FormControl(0);

  //Snackbar thing
  durationInSeconds = 5;

  newUser: "" | any;
  

  /////////////////////////END DEVELOPMENT AND TESTING //////////////////////////////////////////

  //Initializes APIs for use throughout Helius
  constructor(
    public firebaseService : FirebaseService,
    private api : ApiService, 
    private firestore : AngularFirestore,
    private http: HttpClient,
    public restApi: RestApiService,
    overlayContainer: OverlayContainer,
    auth: AngularFireAuthModule,
    private _snackBar: MatSnackBar
      ) {
    
      //Firestore reading logic
      this.Users = firestore.collection('Users').doc(this.currentUser).valueChanges();
      this.itemCollection = this.firestore.collection('Postings');
      this.items = this.itemCollection.valueChanges();

      //Get current user
      this.newUser = firebaseService.firebaseAuth.onAuthStateChanged((user) => {
        if (user) {
          this.currentUser = user.uid
          
        }
      })


      //TESTING
      //this.items = this.itemCollection.valueChanges()._subscribe( data => {
    }

    openSnackBar(message: string, action: string) {
      this._snackBar.open(message, action, {
        duration: 2000,
      });
    }
    
    //Gets values in current users wallet
    checkWallet(){
      var walletGet = this.firestore.collection("Postings")
    }
    
    addItem(item: Postings) {
      this.itemCollection.add(item);
    }

    //TODO add parameters to function to specifly deletes
    deletePosting(seller: string){
      this.firestore.collection("Postings").doc(seller).delete();
    }

    //Sends V4s port address to V5s node server
    connectToNetwork(){
      let port = {
        node_address: 'localhost:8001',
      }
      this.restApi.connectToChain(port);
    }

    //TESTING
    //passsing UID around
    passUid(uid:string){
      // this.uid2 = uid;
    }   

    //When the compnent loads, these functions run
    async ngOnInit(){
      this.dataSource = this.items;
      
      //Pulling Postings from firbase "Postings"
      this.firebaseService.getPostings().subscribe(data => {
        this.postings = data.map(e => {
          return {
            user_name: e.payload.doc.id,
            Energy: e.payload.doc.data()
          } as unknown as Postings
        })
      })
    }


  /////////////////////////FOR DEVELOPMENT AND TESTING //////////////////////////////////////////

   //Called when a user selects "Bid" in posting
   buyEnergy(postID: number, Energy: number, bidValue: number){


      //bidValue.toString()
      this.openSnackBar("Submitted bid of:", this.name.value )
      this.testval = bidValue
      var tempPostID = postID.toString()

      //Send bid to server
      let bid = {
        uid:  this.currentUser,
        Post_Id: tempPostID,
        Amount: bidValue,
      }

      console.log(bid)
      this.postBid(bid)

      this.name.reset()

    }

    
  //Loads the entire chain
  loadChain() {
    return this.restApi.getChain().subscribe((data: {}) => {
      this.Chain.push(data)
    })};
  
    //Adds a placeholder posting for testing
    addPosting(){
      var markoUpdate = this.firestore.collection("Postings").doc("Marko")
      markoUpdate.set({
        user_name: "Marko",
        Energy: 345,
      });

      var shaunUpdate = this.firestore.collection("Postings").doc("Shaun")
      shaunUpdate.set({
        user_name: "Shaun",
        Energy: 500,
      });

      var yashUpdate = this.firestore.collection("Postings").doc("Yash")
      yashUpdate.set({
        user_name: "Yash",
        Energy: 333,
      });

      var yassineUpdate = this.firestore.collection("Postings").doc("Yassine")
      yassineUpdate.set({
        user_name: "Yassine",
        Energy: 420,
      });
    }

    addUserPosting(EnergyValue: number){

      this.myDate.setDate(this.myDate.getDate() + 1);

      //Create random ID
      var randDocId = Math.floor(Math.random() * 100000).toString();

      //Make a new posting using ranomd ID
      var userUpdate = this.firestore.collection("Postings").doc(randDocId)
      userUpdate.set({
        Energy: EnergyValue,
        Owner: this.currentUser,
        PostID: randDocId,
        Time: this.myDate.toString()
      });

      this.name.reset();
    }
  //Calculate the sum of the production array
  //FUCK THIS
  calcSumProductionArray(){
    var sum = 1;
    let temp: any[] = [];
    var i;

    for(i in this.Production){
      this.ProductionArraySum[0] += this.Production[i];
      //this.ProductionArraySum += this.Production[i];
    }
  }

  //Sends request for solar production data
  postProduction(){
    return this.restApi.postProduction().subscribe((data: {}) => {
      this.Production.push(data)
      //let var = data;
      this.calcSumProductionArray();
  })};

  //Sends request for solar production data
  postConsumption(){
    return this.restApi.postConsumption().subscribe((data: {}) => {
      this.Consumption.push(data)
  })};

  postBid(bid: bid){
    return this.restApi.postBid(bid).subscribe((data: {}) => {
      //this.Consumption.push(data)
  })};

  //Sends request for solar production data
  postSurplus(){
    return this.restApi.postSurplus(this.newUser).subscribe((data: {}) => {
      this.Consumption.push(data)
  })};

  getBidValue(bid: number){
    console.warn(bid)
  }




  /////////////////////////END DEVELOPMENT AND TESTING //////////////////////////////////////////
  
  //   this.Production = this.restApi.postProduction();
  // }
  
  //   isLoggedIn() {
  //     return this.afAuth.authState.pipe(first()).toPromise();
  //  }

  //Sends dummy data to chain
  newTransaction(){

        // Get "author", "buyer", "seller", "quantity"
        let transaction = {
            author: "Marko",
            buyer:  "Marko",
            seller: "test",
            quantity: 99,
          }
    
          //Diable buy button for 3 seconds
    
          //send data to chain for processing  
          this.restApi.postChain(transaction);
    //this.restApi.postChain();
  }

  cleanProdArray(){
    this.Production = 0;
  }
      //FOR DEBUGGING ONLY
  // loadProduction() {
  //     //this.restApi.getProduction();
  //     return this.restApi.getProduction().subscribe((data: {}) => {
  //       this.Production.push(data)
  //   })};

};