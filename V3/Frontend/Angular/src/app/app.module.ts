//Basic Routing
import { AppRoutingModule } from './app-routing.module';

//From https://github.com/angular/angularfire/blob/master/docs/install-and-setup.md
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';


//Added for firebase authentication
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { HomeComponent } from './home/home.component';
import { FirebaseService } from './services/firebase.service';


//From https://stackoverflow.com/questions/52523258/angularfire2-cant-find-module-firebase-app/55237532
//import { AngularFireAuth } from '@angular/fire/auth';



//Added fro htttp connections connection
import { HttpClientModule } from '@angular/common/http'

//added from https://www.youtube.com/watch?v=TucRRB57fi8&t=336s
import {FormsModule} from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { WalletComponent } from './wallet/wallet.component';
import { HistoryComponent } from './history/history.component';
import { MarketComponent } from './market/market.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Angular Material Stuff
import { MatSliderModule } from '@angular/material/slider';
import { MatMenuModule } from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTableModule} from '@angular/material/table';

//Fireatore stuff
import { AngularFirestoreCollection } from '@angular/fire/firestore';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    WalletComponent,
    HistoryComponent,
    MarketComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    MatSliderModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatListModule,
    MatGridListModule,
    MatTableModule,


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
    HttpClientModule,

    BrowserAnimationsModule
  ],
  providers: [ FirebaseService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
