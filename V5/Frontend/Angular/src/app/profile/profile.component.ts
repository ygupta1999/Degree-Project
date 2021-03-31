//Imports
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Observable } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators'

//From ex
import { ApiService } from '../services/api.service'; 
// from https://blog.logrocket.com/creating-a-crud-firebase-documents-in-angular/
import { AngularFirestore } from "@angular/fire/firestore";
import { element } from 'protractor';
import { firestore } from 'firebase';

export interface Users {
  Name: string;
  DOB: string;
  Address: string;
  City: string;
  Email: string
  Panels: number;
  Phone: string;
  PostalCode: string;
  Province: string;

}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  //From Ex
  providers: [ApiService],
  template:`
  `
})
export class ProfileComponent implements OnInit {

  Users: Observable<Users[]> | undefined;
  Data: Users[] = [];
  currentUser = "mFSXDDIf4rc0IfIYD6JVGAbmiaf1";

  constructor(
    public firebaseService : FirebaseService,
      private api : ApiService, 
      public firestore : AngularFirestore ) {

        //Generates observable on User_Info
        firestore.collection("User_Info").get().toPromise().then()

        const dbRef = firestore.collection<Users>('User_Info').valueChanges().subscribe((data) => {
          this.Data = data;
        })
      }

    
  ngOnInit(): void {

  }
}
