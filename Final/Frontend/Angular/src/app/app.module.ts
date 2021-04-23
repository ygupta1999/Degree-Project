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
import { FirebaseService } from './services/firebase.service';

//From https://stackoverflow.com/questions/52523258/angularfire2-cant-find-module-firebase-app/55237532
//import { AngularFireAuth } from '@angular/fire/auth';

//Added fro htttp connections connection
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

//added from https://www.youtube.com/watch?v=TucRRB57fi8&t=336s
import { FormsModule } from '@angular/forms';
import { HistoryComponent } from './history/history.component';
import { MarketComponent } from './market/market.component';
import { HomeComponent } from './home/home.component';


//Angular Material Stuff
import { MatSliderModule } from '@angular/material/slider';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatExpansionModule} from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatProgressBarModule} from '@angular/material/progress-bar'; 
import {MatSidenavModule} from '@angular/material/sidenav';



//I keep the new line
//Fireatore stuff
import { AngularFirestoreCollection } from '@angular/fire/firestore';

//Theme stuff
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ReactiveFormsModule } from '@angular/forms';

//V6.1
import { GoogleChartsModule } from 'angular-google-charts';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { AngularWeatherWidgetModule } from 'angular2-weather-widget';


import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';

// import { ThemeModule } from './theme/theme.module';
import { lightTheme } from './theme/light-theme';
import { darkTheme } from './theme/dark-theme';
import { ModuleWithProviders, InjectionToken } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { NgCircleProgressModule } from 'ng-circle-progress';
import {MatDialogModule} from '@angular/material/dialog';
import { GaugeModule } from 'angular-gauge';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { SettingsComponent } from './settings/settings.component';
import { NgxGaugeModule } from 'ngx-gauge';
import { NgxSpinnerModule } from "ngx-spinner";



// Forms module

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		HistoryComponent,
		MarketComponent,
  SettingsComponent,
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
		MatSlideToggleModule,
		MatFormFieldModule,
		ReactiveFormsModule,
		MatSnackBarModule,
		MatExpansionModule,
		GoogleChartsModule,
		MatProgressBarModule,
		NgbPaginationModule,
		NgbAlertModule,
		MatSidenavModule,
		AngularWeatherWidgetModule,
		CommonModule,
		GoogleMapsModule,
		HttpClientJsonpModule,
		MatCardModule,
		NgCircleProgressModule.forRoot(),
		  // Specify ng-circle-progress as an import
		  NgCircleProgressModule.forRoot({
			// set defaults here
			radius: 100,
			outerStrokeWidth: 16,
			innerStrokeWidth: 8,
			outerStrokeColor: "#78C000",
			innerStrokeColor: "#C7E596",
			animationDuration: 300,
		  }),
		  MatDialogModule,
		//   GaugeModule.forRoot(),
		  MatProgressSpinnerModule,
		  GaugeModule.forRoot(),
		  NgxGaugeModule,
		  NgxSpinnerModule,


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
		BrowserAnimationsModule,

	],
	providers: [FirebaseService],
	bootstrap: [AppComponent]
})
export class AppModule {
}
