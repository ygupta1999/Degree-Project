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

//TESTING
import { element } from 'protractor';
import {MatTableModule} from '@angular/material/table';
import { TestBed } from '@angular/core/testing';
import {MDCDataTable} from '@material/data-table';


//New rest stuff
import { RestApiService } from "../shared/rest-api.service";
import { snapshotChanges } from '@angular/fire/database';


//Interfaces for Objects
export interface Postings {
  user_name: string;
  //Amount: number;
  Energy: number;
}

export interface test {
  length: number;
  chain: string;
  peers: string;
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
  `
})
export class MarketComponent implements OnInit {
  
  //Firestore data reading/writing
  private itemCollection: AngularFirestoreCollection<Postings>;
  items: Observable<Postings[]> | undefined;
  Users: Observable<any[]>;
  
  //for http
  data: Observable<test[]> | undefined;
  number: test | undefined;
  walletValue: any | undefined;
  
  //TESTING
  //buttonTest = '1';
  //dataTest:Observable<any[]>;
  postings: Postings[] | undefined;

  //STABLE
  //Basic chain object
  Chain: any = [];
  
  //URL Links
  readonly ROOT_URL = "https://jsonplaceholder.typicode.com"
  readonly SERVER_URL = "http://127.0.0.1:8000"

  //Basic date
  myDate = Date.now();

  //Testing production
  Production: any = [];

  //Initializes APIs for use throughout Helius
  constructor(
    public firebaseService : FirebaseService,
    private api : ApiService, 
    private firestore : AngularFirestore,
    private http: HttpClient,
    public restApi: RestApiService
      ) {
    
      //Firestore reading logic
      this.Users = firestore.collection('Users').valueChanges();
      this.itemCollection = this.firestore.collection('Postings');
      this.items = this.itemCollection.valueChanges();
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

    delPosting(){
      this.firestore.collection("Postings").doc("Marko").delete();
    }

    //TESTING
    //Writes to Firestore but disappers instanly
    addPosting(){
      var markoUpdate = this.firestore.collection("Postings").doc("Marco")
      markoUpdate.set({
        user_name: "suck it",
        Energy: 345,
        Amount: 777
      });
    }

    async getPostings(){
      // var data = this.firestore.collection("Postings")
      // data.get().then(())
      // this.postings = this.firestore.collection("Postings").get()
      // const snapshot = await this.firestore.collection("Postings").get()
      // snapshot.
      // return snapshot.docs.map
    }

    //This is initiates a buy
    buyEnergy(){
      //let test;
      //var query = this.firestore.collection("Wallet").doc("Marko").snapshotChanges
      //markoUpdate.get().then(() => )
      // Get seller ID, units, and buyer into data object
      //Submit to chain
    }
       
    //TESTING
    displayedColumns = ['user_name',  'Energy'];
    dataSource: Observable<Postings[]> | undefined;
    dataDisplay: Observable<test[]> | undefined;
    
    //When the compnent loads, these functions run
    async ngOnInit(){
      this.dataSource = this.items;
      this.firebaseService.getPostings().subscribe(data => {
        this.postings = data.map(e => {
          return {
            user_name: e.payload.doc.id,
            Energy: e.payload.doc.data()
          } as unknown as Postings
        })
      })
    }
  
  //Loads the entire chain
  loadChain() {
    return this.restApi.getChain().subscribe((data: {}) => {
      this.Chain.push(data)
    })};

    //FOR DEBUGGING ONLY
  // loadProduction() {
  //     //this.restApi.getProduction();
  //     return this.restApi.getProduction().subscribe((data: {}) => {
  //       this.Production.push(data)
  //   })};

  //Sends request for solar production data
  postProduction(){
    return this.restApi.postProduction().subscribe((data: {}) => {
      this.Production.push(data)
  })};
  //   this.Production = this.restApi.postProduction();
  // }

  //Sends dummy data to chain
  newTransaction(){
    this.restApi.postChain();
  }




};