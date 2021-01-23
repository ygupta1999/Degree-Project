import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Added for firebase use
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { HomeComponent } from './home/home.component';
import { FirebaseService } from './services/firebase.service';

//Added fro htttp connections connection
import { HttpClientModule } from '@angular/common/http'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    //Firebase setup
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyACqLx1Hwj0sZ7OWWo7LpgQyYpTHiwgNqY",
      authDomain: "helius-70808.firebaseapp.com",
      projectId: "helius-70808",
      storageBucket: "helius-70808.appspot.com",
      messagingSenderId: "475929370500",
      appId: "1:475929370500:web:cf04f39d3a9d487d9d07d1",
      measurementId: "G-SWCJ32CMDT"
    }),

    AngularFireAuthModule,
    AngularFireDatabaseModule,

    //For HTTP connecting
    HttpClientModule
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
