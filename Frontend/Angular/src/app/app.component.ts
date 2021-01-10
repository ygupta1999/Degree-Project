import { Component, OnInit } from '@angular/core';
import { FirebaseService } from './services/firebase.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'helius';
  isSignedIn = false

  //Initializes firebase
  constructor(public firebaseService : FirebaseService){}
  ngOnInit(){

    //Checking if user is signed in
    if(localStorage.getItem('user')!== null)
    this.isSignedIn = true
    else
    this.isSignedIn = false
  }

  //Handles signup functionality
  async onSignup(email: string, password:string){
    await this.firebaseService.signup(email,password)
    if(this.firebaseService.isLoggedIn)
    this.isSignedIn = true
  }

  //Handles signin functionality
  async onSignin(email: string, password:string){
    await this.firebaseService.signin(email,password)
    if(this.firebaseService.isLoggedIn)
    this.isSignedIn = true
  }

  //Logout functionality
  handleLogout(){
    this.isSignedIn = false
  }

}
