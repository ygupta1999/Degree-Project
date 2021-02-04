//Imports
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Observable } from 'rxjs';

//From ex
import { ApiService } from '../services/api.service'; 

// from https://blog.logrocket.com/creating-a-crud-firebase-documents-in-angular/
import { AngularFirestore } from "@angular/fire/firestore";
import { element } from 'protractor';


@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css'],
  //From Ex
  providers: [ApiService]

})

export class WalletComponent implements OnInit {

  Users: Observable<any[]>;

  constructor(
    public firebaseService : FirebaseService,
      private api : ApiService, 
      firestore : AngularFirestore ) {

        //Firestore reading logic
        this.Users = firestore.collection('Users').valueChanges();

      }
  

  ngOnInit(): void {
  }

}
