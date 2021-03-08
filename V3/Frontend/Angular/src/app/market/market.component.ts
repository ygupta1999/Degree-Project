import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Observable } from 'rxjs';

//From ex
import { ApiService } from '../services/api.service'; 
// from https://blog.logrocket.com/creating-a-crud-firebase-documents-in-angular/
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFirestoreCollection } from '@angular/fire/firestore';

import { element } from 'protractor';
import {MatTableModule} from '@angular/material/table';
//import { MatTableDataSource } from "@angular/material";

export interface Postings {
  user_name: string;
  Amount: number;
  Energy: number;
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

  //For the date thing
  myDate = Date.now();
  
  //For reading firestore data
  //Each "collection" needs its own observable!!!!
  private itemCollection: AngularFirestoreCollection<Postings>;
  items: Observable<Postings[]>;
  Users: Observable<any[]>;

  //Initializes firebase and all its services
  constructor(
    public firebaseService : FirebaseService,
    private api : ApiService, 
    private firestore : AngularFirestore ) {
    
      //Firestore reading logic
      this.Users = firestore.collection('Users').valueChanges();
      this.itemCollection = this.firestore.collection('Postings');
      this.items = this.itemCollection.valueChanges()
    }
    
    addItem(item: Postings) {
      this.itemCollection.add(item);
    }

    updatePostings(){


    }

    delPosting(){
      this.firestore.collection("Postings").doc("Marko").delete();
    }

    addPosting(){
      var markoUpdate = this.firestore.collection("Postings").doc("Marco")
      markoUpdate.set({
        user_name: "suck it",
        Energy: 345,
        Amount: 777
      });
    }

    displayedColumns = ['user_name', 'Amount',  'Energy'];
    dataSource: Observable<Postings[]> | undefined;
  
    async ngOnInit(){
      this.dataSource = this.items;
  };
};
