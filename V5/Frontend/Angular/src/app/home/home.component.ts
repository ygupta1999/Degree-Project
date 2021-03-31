//This file handles most of the logic throughout the compnent

//Imports
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Observable } from 'rxjs';
//From ex
import { ApiService } from '../services/api.service'; 
// from https://blog.logrocket.com/creating-a-crud-firebase-documents-in-angular/
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
//import { FirebaseUser } from '@angular/fire/auth/User';

import { element } from 'protractor';
//import { Users } from '../services/user.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  //From Ex
  providers: [ApiService]
})
export class HomeComponent implements OnInit {

  isDarkTheme:boolean = true;

  //Flags for where you are in the app
  public Home:boolean = false;
  public Profile:boolean = false;
  public Wallet:boolean = false;
  public History:boolean = false;
  public Market:boolean = true;

  //TESTING: UID accessing
  public uid: string | undefined;

  //TESTING
  public currentUser: firebase.User | any;

  //For reading firestore data
  //Each "collection" needs its own observable!!!!
  Users: Observable<any[]>;
 
  //Logic for handeling event of a logout
  @Output() isLogout = new EventEmitter<void>()


  //Initializes firebase and all its services
  constructor(
    public firebaseService : FirebaseService,
    private api : ApiService, 
    public firestore : AngularFirestore,
    public auth: AngularFireAuth ) {
    
      //Firestore reading logic of User_Info
      this.Users = this.firestore.collection<any>('User_Info').valueChanges();
      
      //TESTING
      //Get current user
      auth.authState.subscribe(user => {
        this.currentUser = this.auth.currentUser;
        console.log(user);
      });
    }

      
  //Logic to be executed on initilization of component
  ngOnInit(): void {

    //TESTING
    //this.uid = this.auth.currentUser
    //console.log(uid)
  }

  //Logout method
  logout(){
    this.firebaseService.logout()
    this.isLogout.emit()
  }

  //For choosing which component will be displayed from the nav bar
  showHome(){
    this.Profile = false;
    this.Wallet = false;
    this.History = false;
    this.Market = false;
  }
  showProfile(){
    this.Profile = !this.Profile;
    this.Wallet = false;
    this.History = false;
    this.Market = false;
  }
  showWallet(){
    this.Wallet = !this.Wallet;
    this.Profile = false;
    this.History = false;
    this.Market = false;
  }
  showHistory(){
    this.History = !this.History;
    this.Profile = false;
    this.Wallet = false;
    this.Market = false;
  }
  showMarket(){
    this.Market = !this.Market;
    this.Profile = false;
    this.Wallet = false;
    this.History = false;
  }
}

//This section deals with pullling data from backend django
//Non functional but leaving for reference 
/*
export class AppComponent {
  movies = [{title: 'Titanic'}];

  constructor(private api:ApiService){
    this.getMovies();

  }
  //Function for getting it from API
  //So confusing
  getMovies = () => {

    this.api.getAllMovies().subscribe(
      data => {
        this.movies = data
      },
      error => {
        console.log(error);
      }
    )
  }
}
*/
