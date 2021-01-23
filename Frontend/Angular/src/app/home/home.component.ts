import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';

//From ex
import { ApiService } from '../services/api.service'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  //From Ex
  providers: [ApiService]
})
export class HomeComponent implements OnInit {
  
  //Logic for handeling event of a logout
  @Output() isLogout = new EventEmitter<void>()
  constructor(public firebaseService: FirebaseService) { }

  ngOnInit(): void {
  }

  //Logout method
  logout(){
    this.firebaseService.logout()
    this.isLogout.emit()
  }
}

//This section deals with pullling data from backend. This example just loads random movies
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
