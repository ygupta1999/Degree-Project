import { Component, OnInit } from '@angular/core';

//These are sevices we use to connect to stuff
//Taken from the services folder
import { FirebaseService } from './services/firebase.service';
import { ApiService } from './services/api.service'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ApiService]
})

export class AppComponent implements OnInit {

  //Variable declerations
  title = 'helius';
  isSignedIn = false;
  movies = [{title: 'Titanic'}];

  //constructor(private api:ApiService){ 
  //  ;this.getMovies()

  //}

     //TODO
    //- Cant target services file
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

  //Initializes firebase
  constructor(public firebaseService : FirebaseService, private api:ApiService ){}
  ngOnInit(){

    //Checking if user is signed in
    if(localStorage.getItem('user')!== null)
    this.isSignedIn = true
    else
    this.isSignedIn = false

    ;this.getMovies()
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
