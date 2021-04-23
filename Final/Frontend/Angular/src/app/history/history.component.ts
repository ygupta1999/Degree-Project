import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FormControl } from '@angular/forms';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFirestore } from "@angular/fire/firestore";
import { FirebaseService } from '../services/firebase.service';


//Interfaces for Objects
export interface Postings {
  user_name: string;
  Energy: number;
}

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  displayedColumns = ['user_name',  'Energy', 'Bid'];
  private itemCollection: AngularFirestoreCollection<Postings>;
  items: Observable<Postings[]> | undefined;
  postings: Postings[] | undefined;



  dataSource: Observable<Postings[]> | any;
    /////Dynamic form stuff
    name = new FormControl('');

  constructor(
    private firestore : AngularFirestore,
    public firebaseService : FirebaseService,

    ) { 
    
      this.itemCollection = this.firestore.collection('Postings');
      this.items = this.itemCollection.valueChanges();

  }

  ngOnInit(): void {
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

}
