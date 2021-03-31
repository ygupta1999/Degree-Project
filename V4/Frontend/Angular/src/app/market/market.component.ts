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


//New rest stuff
import { RestApiService } from "../shared/rest-api.service";
import { snapshotChanges } from '@angular/fire/database';

//Theming
import {OverlayContainer} from '@angular/cdk/overlay';
import { DOCUMENT } from '@angular/common';



//Interfaces for Objects
export interface Postings {
  user_name: string;
  Energy: number;
}

export interface user {
  uid: string;
}

export interface test {
  length: number;
  chain: string;
  peers: string;
}

export interface transaction {
  author: String;
  buyer:  String;
  seller: String;
  quantity: number;
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
  

  displayedColumns = ['user_name',  'Energy'];
  dataSource: Observable<Postings[]> | any;
  dataDisplay: Observable<test[]> | undefined;

  //Production variables
  Production: any = [];

  
  /////////////////////////START DEVELOPMENT AND TESTING //////////////////////////////////////////
  
  //temp user
  parser = new DOMParser();

  currentUser = "mFSXDDIf4rc0IfIYD6JVGAbmiaf1";




  // uid = JSON.parse(window.localStorage.getItem('user'));

  // uid2 = ""

  //let obj = JSON.parse(current)
  //Basic date
  myDate = Date.now();
  //URL Links
  //readonly ROOT_URL = "https://jsonplaceholder.typicode.com"
  //readonly SERVER_URL = "http://127.0.0.1:8000"
  //dataTest:Observable<any[]>;
  //buttonTest = '1';
  ProductionArraySum: number[] = [];

  testBuy: String = ""

  /////////////////////////END DEVELOPMENT AND TESTING //////////////////////////////////////////



  //Initializes APIs for use throughout Helius
  constructor(
    public firebaseService : FirebaseService,
    private api : ApiService, 
    private firestore : AngularFirestore,
    private http: HttpClient,
    public restApi: RestApiService,
    overlayContainer: OverlayContainer,
    auth: AngularFireAuthModule
      ) {
    
      //Firestore reading logic
      this.Users = firestore.collection('Users').doc(this.currentUser).valueChanges();
      this.itemCollection = this.firestore.collection('Postings');
      this.items = this.itemCollection.valueChanges();

      //this.currentUser = this.firebaseService.firebaseAuth.currentUser.uid();


      //overlayContainer.getContainerElement().classList.add('dark-theme-mode');
      //this.items = this.itemCollection.valueChanges()._subscribe( data => {

    }

    //Functions for MarketComponent

    //Gets values in current users wallet
    checkWallet(){
      this.walletValue = this.firestore.collection("Users").get()
    }
    
    addItem(item: Postings) {
      this.itemCollection.add(item);
    }

    //TODO add parameters to function to specifly deletes
    deletePosting(seller: string){
      this.firestore.collection("Postings").doc(seller).delete();
    }

    //Called when a user selects "Buy" in posting
    buyEnergy(seller: string, quantity: number){

    // Get "author", "buyer", "seller", "quantity"
    let transaction = {
        author: "Marko",
        buyer:  "Marko",
        seller: seller,
        quantity: quantity,
      }

      //Diable buy button for 3 seconds

      //send data to chain for processing  
      this.restApi.postChain(transaction);

      //check if transaction was good

      //Delete Posting
      this.deletePosting(seller)
    }

    //Sends V5s port address to V4s node server
    connectToNetwork(){
      let port = {
        node_address: 'localhost:8003',
      }

      this.restApi.connectToChain(port);
    }

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

  //Loads the entire chain
  loadChain() {
    return this.restApi.getChain().subscribe((data: {}) => {
      this.Chain.push(data)
    })};
  
    //Adds a placeholder posting for
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
        Energy: 1,
      });
    }

    //FOR DEBUGGING ONLY
  // loadProduction() {
  //     //this.restApi.getProduction();
  //     return this.restApi.getProduction().subscribe((data: {}) => {
  //       this.Production.push(data)
  //   })};

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

  cleanProdArray(){
    this.Production = 0;
  }
  //   this.Production = this.restApi.postProduction();
  // }

  //Sends dummy data to chain
  newTransaction(){
    //this.restApi.postChain();
  }

   //   isLoggedIn() {
  //     return this.afAuth.authState.pipe(first()).toPromise();
  //  }

  /////////////////////////END DEVELOPMENT AND TESTING //////////////////////////////////////////


};