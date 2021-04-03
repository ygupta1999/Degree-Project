//Imports
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Observable } from 'rxjs';

//From ex
import { ApiService } from '../services/api.service'; 
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { element } from 'protractor';

//6.1
import { FormControl } from '@angular/forms';
import { RestApiService } from "../shared/rest-api.service";
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChartType } from 'angular-google-charts';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { forEach } from 'jszip';
import { stringify } from '@angular/compiler/src/util';


declare var google: any;


//Interfaces for Objects
export interface Postings {
  Owner: string;
  Energy: number;
  PostId: String;
  Time: String
}

export interface surplus {
  Time: any;
  Energy: any;
  Production: any[];
  Consumnption: any[];
  Time_Labels: any;
  Message: any;
}

export interface user {
  Address: any;
  City: any;
  Email: any;
  Name: any;
  Panels: any;
  Phone: any;
  PostalCode: any;
  model: any;
  uid: any;
}

export interface loggedIn {
  name: string;
  wallet: number
}

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
  public Home:boolean = true;
  public History:boolean = false;
  public Market:boolean = false;
  public App:boolean = false;

  //TESTING: UID accessing
  public uid: string | undefined;

  surplusTest: surplus| any;

  //TESTING
  //public currentUser: firebase.User | any;

  //For reading firestore data
  private itemCollection: AngularFirestoreCollection<Postings>;
  items: Observable<Postings[]> | undefined;
  Users: Observable<any[]>;
 
  //Logic for handeling event of a logout
  @Output() isLogout = new EventEmitter<void>()

  /// 6.1
  //Production variables
  Production: any = [];
  Consumption: any = [];
  Surplus: any = [];
  surplusReturn: any = [];
  div1:boolean= false;
  myDate: any = new Date();
  currentUser = "zvDRU1bQ0uNJTupmjnRt10MktYF3";

  /////Dynamic form stuff
  homeFormController = new FormControl('');
  nameControl = new FormControl('Marko');
  test: any
  testUser: "yooo" | any;
  currentLoggedIn: loggedIn | any;


  //Chart Stuff
  title = 'Todays Consumption and Production';
  type = 'LineChart' as ChartType;
  
  myData = [
      ["6:00", 0.6308155059814453, 0.8747505225994002],
      ["7:00", 0.6733898520469666, 1.3814510951795642],
      ["8:00", 0.5752107501029968 ,1.682902777769404],
      ["9:00", 0.4846254992485046, 1.8758331984110364],
      ["10:00", 0.47333218693733215, 1.907152142952121],
      ["11:00", 0.44813472032546997, 1.7875340093495524],
      ["12:00", 0.537156343460083, 1.5300655001194186],
      ["13:00", 0.6297104167938232, 1.1559470123335978],
      ["14:00", 0.6615541577339172, 0.6870666638007665],
      ["15:00", 0.648527979850769, 0.16737378579781656],
      ["16:00", 0.6192701458930969, 0],
      ["17:00", 0.612489640712738,0],
      ["18:00", 0.6194704174995422,0],
      ["19:00", 0.5848207473754883,0],
      ["20:00", 0.6313588619232178,0],
      ["21:00", 0.613508403301239,0],
      ["22:00", 0.5983426570892334,0],
      ["23:00", 0.5797014236450195,0],
      ["0:00", 0.5803879499435425,0],
      ["1:00", 0.5906589031219482,0],
      ["2:00", 0.5657350420951843,0],
      ["3:00", 0.5731875896453857,0],
      ["4:00", 0.6405864357948303,0],
      ["5:00", 0.6253179907798767, 0],
  ];

  //Chart holders
  timeChart = [];
  productionChart = [];
  consumptionChart  = [];

  chartData: [][] | any;
  
  columnNames = ["Time", "Consumption", "Production"];
   options = {   
     is3D: true,
     animation: {
       duration: 1000,
       easing: 'out',
     },

      hAxis: {
         title: 'Time'
      },
      vAxis:{
         title: 'Energy'
      },
      textStyle: {
        bold: true,
        fontSize: 20
      }
   };
   width = 1600;
   height = 400;

   //user
   newUser: "" | any;

  n2: string = "";

  today: number = Date.now();

  test2: any[] = [];

  name2: any[] = [];



  //Initializes firebase and all its services
  constructor(
    public firebaseService : FirebaseService,
    private api : ApiService, 
    public firestore : AngularFirestore,
    public auth: AngularFireAuth,
    public restApi: RestApiService,
    private _snackBar: MatSnackBar,

    ) {
    
      //Firestore reading logic of User_Info
      this.Users = this.firestore.collection<any>('User_Info').valueChanges();
      this.itemCollection = this.firestore.collection('Postings');

 
      //TESTING
      auth.authState.subscribe(user => {
        //this.currentUser = this.auth.currentUser;
        console.log(user);
      });

      // this.firestore.collection("test").doc("rRhrdVZZrkQV4J4dijdtM38v7aC2").get().subscribe((data) => {
      //   this.name2.push(data);
      // });


      //Get current user
      this.newUser = this.firebaseService.firebaseAuth.onAuthStateChanged((user) => {
        if (user) {
          this.newUser = user.uid
          this.testUser = user.uid.toString()
        
        }
      })

      if (this.testUser = "mFSXDDIf4rc0IfIYD6JVGAbmiaf1") {

        this.firestore.collection("test").doc("mFSXDDIf4rc0IfIYD6JVGAbmiaf1").get().subscribe((data) => {
          this.name2.push(data.data());
        });
        this.newUser = "Tester1"
        // this.currentLoggedIn.name = "Tester2"
        // this.currentLoggedIn.wallet = 999;
        
      } else if (this.testUser = "NOtcKxDvogdK9JbDTacpUbb1EiC2") {
        this.currentLoggedIn.name = "Marko 1"
        this.currentLoggedIn.wallet = 999;
  
      } else if (this.testUser = "rRhrdVZZrkQV4J4dijdtM38v7aC2"){
        this.name2[0] = "Tester2"
        this.testUser = "Marko"
        this.firestore.collection("test").doc("rRhrdVZZrkQV4J4dijdtM38v7aC2").get().subscribe((data) => {
          this.name2.push(data.data());
        });

        this.currentLoggedIn.name = "Marko 2"
        this.currentLoggedIn.wallet = 999;
  
      } else if (this.testUser = "zvDRU1bQ0uNJTupmjnRt10MktYF3"){
        this.currentLoggedIn.name = "Yash"
        this.currentLoggedIn.wallet = 999;
      }

    }

  //Logic to be executed on initilization of component
  ngOnInit(): void {

      // //Get current user
      // this.newUser = this.firebaseService.firebaseAuth.onAuthStateChanged((user) => {
      //   if (user) {
      //     this.newUser = user.uid.toString()

      //     if (user.uid = "mFSXDDIf4rc0IfIYD6JVGAbmiaf1") {

      //       this.newUser = "Test2"
      //       this.currentLoggedIn.name = "Tester2"
      //       this.currentLoggedIn.wallet = 999;
            
      //     } else if (user.uid = "NOtcKxDvogdK9JbDTacpUbb1EiC2") {
      //       this.currentLoggedIn.name = "Marko"
      //       this.currentLoggedIn.wallet = 999;
      
      //     } else if (user.uid = "rRhrdVZZrkQV4J4dijdtM38v7aC2"){
      //       this.currentLoggedIn.name = "Marko2"
      //       this.currentLoggedIn.wallet = 999;
      
      //     } else if (user.uid = "zvDRU1bQ0uNJTupmjnRt10MktYF3"){
      //       this.currentLoggedIn.name = "Yash"
      //       this.currentLoggedIn.wallet = 999;
      //     }
      //   }
      // })
    this.postSurplus();

    this.n2 = this.newUser;
    var test = this.newUser.toString();


    // this.firestore.collection("test").doc("rRhrdVZZrkQV4J4dijdtM38v7aC2").get().subscribe((data) => {
    //   this.name2.push(data.data());
    // });


    this.firestore.collection("Users").get().subscribe((data) => {
      data.docs.forEach((doc) => {
        this.test2.push(doc.data());
      });
    });

    //instant connect
    let port = {
      node_address: 'localhost:8002',
    }
    this.restApi.connectToChain(port)


  }

  convertUid(){
    this.n2 = this.newUser;

  }

  getWallet(){
    return this.firestore.collection("Users").snapshotChanges();
  }
  

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  //Logout method
  logout(){
    this.firebaseService.logout()
    this.isLogout.emit()
  }

  //For choosing which component will be displayed from the nav bar
  showHome(){
    this.History = false;
    this.Market = false;
    this.App = false;
    this.Home = !this.Home;
  }

  showHistory(){
    this.History = !this.History;
    this.Home = false;
    this.App = false;
    this.Market = false;
  }

  showMarket(){
    this.Home = false;
    this.History = false;
    this.App = false;
    this.Market = !this.Market;
  }

  //Sends request for solar production data
  postSurplus(){
    return this.restApi.postSurplus().subscribe((data: {}) => {
      
      this.surplusTest = data;
      this.Consumption.push(data)        
      this.div1= true;
      this.makeChartData();

      // if (this.newUser = "mFSXDDIf4rc0IfIYD6JVGAbmiaf1") {

      //   this.currentLoggedIn.name = "Tester2"
      //   this.currentLoggedIn.wallet = 999;
        
      // } else if (this.newUser = "NOtcKxDvogdK9JbDTacpUbb1EiC2") {
      //   this.currentLoggedIn.name = "Marko"
      //   this.currentLoggedIn.wallet = 999;
  
      // } else if (this.newUser = "rRhrdVZZrkQV4J4dijdtM38v7aC2"){
      //   this.currentLoggedIn.name = "Marko2"
      //   this.currentLoggedIn.wallet = 999;
  
      // } else if (this.newUser = "zvDRU1bQ0uNJTupmjnRt10MktYF3"){
      //   this.currentLoggedIn.name = "Yash"
      //   this.currentLoggedIn.wallet = 999;
      // }

      // this.testUser = this.restApi.newUser;

      console.log("test1")
  })};


  //Posting utility that is used on the home page
  addHomePosting(EnergyValue: number){

    //this.marketComp.addUserPosting(EnergyValue)
    //this.myDate.setDate(this.myDate.getDate() + 1);

    //Create random ID
    var randDocId = Math.floor(Math.random() * 100000).toString();

    //Make a new posting using ranomd ID
    var userUpdate = this.firestore.collection("Postings").doc(randDocId)
    userUpdate.set({
      Energy: this.surplusTest.Energy.toFixed(2) ,
      Owner: this.newUser,
      PostID: randDocId,
      Time: this.surplusTest.Time
    });
  
    this.openSnackBar("Posting added to marketplace", this.surplusTest.Energy.toFixed(2) )
    }

    passValue(value:String){
      this.test=value;
    }

    //Deconstructs chart
    makeChartData(){
      
      //new vis data
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Time');
      data.addColumn('number', 'Consumption');
      data.addColumn('number', 'Production');

      //loop through
      for (let i = 0; i < this.surplusTest.length; i++) {
        // for (let j = 0; j < this.surplusTest.length; j++) {
          data.addRows([
            [this.surplusTest.Time[i], this.surplusTest.Consumnption[i], this.surplusTest.Production[i]]]);
      
      this.chartData = data;

          // this.chartData[i][j] = this.surplusTest.Time[i]
          // this.timeChart = this.surplusTest.Time[i]
          // this.productionChart = this.surplusTest.Production[i]
          // this.consumptionChart = this.surplusTest.Consumnption[i]   
        }

      
  
    }

}


