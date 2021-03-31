import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  isLoggedIn = false;
  constructor(public firebaseAuth: AngularFireAuth,
     private http: HttpClient,
     private firestore: AngularFirestore
     ) { }

  //Authenticating with firebase email and login
  async signin(email : string, password : string){
    await this.firebaseAuth.signInWithEmailAndPassword(email,password)
    .then(res=>{
      this.isLoggedIn = true
      localStorage.setItem('user',JSON.stringify(res.user))
    })
  }

  //Signining up with firebase auth
  async signup(email : string, password : string){
    await this.firebaseAuth.createUserWithEmailAndPassword(email,password)
    .then(res=>{
      this.isLoggedIn = true
      localStorage.setItem('user',JSON.stringify(res.user))
    })
  }

  logout(){
    this.firebaseAuth.signOut()
    localStorage.removeItem('user')
  }

  getPostings(){
    return this.firestore.collection('Postings').snapshotChanges();
  }
}
