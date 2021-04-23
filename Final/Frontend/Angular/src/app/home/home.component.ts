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

//Bootstrap
import {NgbConfig} from '@ng-bootstrap/ng-bootstrap';
import { GoogleMapsModule } from '@angular/google-maps'
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Articles, initialArticles } from './article.model';
import { NgCircleProgressModule } from 'ng-circle-progress';
import {MatDialog} from '@angular/material/dialog';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';




//Interfaces for Objects
export interface Postings {
  Owner: string;
  Energy: number;
  PostId: String;
  Time: String
  ReservationValue: number;
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
  providers: [ApiService],
  // template: `

  //   <mwl-gauge class="ml-gauge2
  //     [max]="100"
  //     [dialStartAngle]="-90"
  //     [dialEndAngle]="-180.001"
  //     [value]="40"
  //     [animated]="true"
  //     [animationDuration]="1"
  //   >
  //   </mwl-gauge>

  //   <mwl-gauge
  //   class="two"
  //   [max]="100"
  //   [dialStartAngle]="180"
  //   [dialEndAngle]="0"
  //   [value]="gaugeValues[2]"
  //   [animated]="true"
  //   [animationDuration]="2"
  // >
  // </mwl-gauge>

  // `,
})


export class HomeComponent implements OnInit {

  isDarkTheme:boolean = true;

  //Flags for where you are in the app
  public Home:boolean = true;
  public History:boolean = false;
  public Market:boolean = false;
  public App:boolean = false;
  public Settings:boolean = false;

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
  Consumption2: any = [];
  Production2: any = [];
  Consumption3: any = [];


  //Chart Stuff
  title = 'Todays Consumption and Production';
  //type = 'LineChart' as ChartType;
  
  myData = [
      ["6:00", 0.6308155059814453, 0.9747505225994002],
      ["7:00", 0.6733898520469666, 1.4814510951795642],
      ["8:00", 0.5752107501029968 ,1.7982902777769404],
      ["9:00", 0.5046254992485046, 1.9758331984110364],
      ["10:00", 0.48333218693733215, 2.007152142952121],
      ["11:00", 0.44813472032546997, 1.8875340093495524],
      ["12:00", 0.537156343460083, 1.6300655001194186],
      ["13:00", 0.6497104167938232, 1.2559470123335978],
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
      hAxis: {
         title: 'Time',
      },
      vAxis:{
         title: 'Energy'
      },
      textStyle: {
        bold: true,
        fontSize: 20,
      },

      textColour :  'rgb(255, 245, 238)',
      backgroundColor: 'rgb(37, 38, 37)',
   };
   width = 800;
   height = 400;

   red = "1"

  
   //user
   newUser: "" | any;
   newUserWallet = 0;
    n2: string = "";
    today: number = Date.now();
    test2: any[] = [];
    name2: any[] = [];


  ///////////////////////// POST YASSINE //////////////////////
  showFiller = false;

  //Weather API
  APIKEY="371ac5d82fbd5ce01eea716929d51eec"

  //NewsAPI
  countryForm!: FormGroup;
  articles: Articles = initialArticles;
  subtitleFontSize = 20;
  closeResult = '';

  percentageValue!: (value: number) => string;

  gaugeValues: any = {
    1: 100,
    2: 50,
    3: 50,
    4: 50,
    5: 50,
    6: 50,
    7: 50,
  };

  interval: any;

  /////Post U2
  userId = ""


  gaugeType = "semi";
  gaugeValue = 6.2;
  gaugeLabel = "Consumption";
  gaugeAppendText = "kWh";
  gaugeMax = 10;
  foregroundColor = "rgb(255,0,0,1)"

  gaugeType1 = "semi";
  gaugeValue1 = 9.2;
  gaugeLabel1 = "Production";
  gaugeAppendText1 = "kWh";
  foregroundColor1 = "rgb(0,255,0,1)"

  gaugeType2 = "semi";
  gaugeValue2 = 3.1;
  gaugeLabel2 = "Surplus";
  gaugeAppendText2 = "kWh";
  foregroundColor2 = "rgb(255,255,0,1)"

  round = "round"
  // size2 = 400;

  verticalPosition: MatSnackBarVerticalPosition = 'top';

  //Initializes firebase and all its services
  constructor(
    public firebaseService : FirebaseService,
    private api : ApiService, 
    public firestore : AngularFirestore,
    public auth: AngularFireAuth,
    public restApi: RestApiService,
    private _snackBar: MatSnackBar,
    httpClient: HttpClient,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,

    ) {
    
      //Firestore reading logic of User_Info
      this.Users = this.firestore.collection<any>('User_Info').valueChanges();
      this.itemCollection = this.firestore.collection('Postings');

 
      //TESTING
      auth.authState.subscribe(user => {
        //this.currentUser = this.auth.currentUser;
        console.log(user);
      });
    }

  //Logic to be executed on initilization of component
  ngOnInit(): void {

      //Get current user and staticclly assing values to them
      this.newUser = this.firebaseService.firebaseAuth.onAuthStateChanged((user) => {
        if (user) {
          this.newUser = user.uid.toString()

          if (this.newUser == "mFSXDDIf4rc0IfIYD6JVGAbmiaf1") {
            this.newUser = "Tester"
            this.userId = "mFSXDDIf4rc0IfIYD6JVGAbmiaf1"
            this.newUserWallet = 9000

            
          } else if (this.newUser == "NOtcKxDvogdK9JbDTacpUbb1EiC2") {
            this.newUser = "Marko"
            this.userId = "NOtcKxDvogdK9JbDTacpUbb1EiC2"
            this.newUserWallet = 500

      
          } else if (this.newUser == "rRhrdVZZrkQV4J4dijdtM38v7aC2"){
            this.userId = "rRhrdVZZrkQV4J4dijdtM38v7aC2"
            this.newUser = "Marko"
            this.newUserWallet = 420

      
          } else if (this.newUser == "zvDRU1bQ0uNJTupmjnRt10MktYF3"){
            this.newUser = "Yash"
            this.userId = "zvDRU1bQ0uNJTupmjnRt10MktYF3"
            this.newUserWallet = 100
          }
        }
      })



      this.postSurplus();
      this.firestore.collection("test").doc("rRhrdVZZrkQV4J4dijdtM38v7aC2").get().subscribe((data) => {
        this.name2.push(data.data());
      });
    this.firestore.collection("Users").get().subscribe((data) => {
      data.docs.forEach((doc) => {
        this.test2.push(doc.data());
      });
    });

    this.convertArray();
    this.countryForm = this.buildCountryForm();
    this.getCountryNews();

    const updateValues = (): void => {
      this.gaugeValues = {
        1: Math.round(Math.random() * 100),
        2: Math.round(Math.random() * 100),
        3: Math.round(Math.random() * 100),
        4: Math.round(Math.random() * 100),
        5: Math.round(Math.random() * 200),
        6: Math.round(Math.random() * 100),
        7: Math.round(Math.random() * 100),
      };
    };

    const INTERVAL: number = 5000;
    this.interval = setInterval(updateValues, INTERVAL);
    updateValues();
  }

  showSpinner() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 5000);
  }

  //NEWS THING
  buildCountryForm(): FormGroup {
    return this.fb.group({
      country: ['Energy', [Validators.required]]
    })
  }

  openArticle(url: string) {
    window.open(url, "_blank");
  }

  getCountryNews(){
    this.restApi.getNewsServiceByCountry(this.countryForm.get('country')?.value).subscribe(
      (resp: any) => {
        this.articles = resp
      }
    ) ;

  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  convertUid(){
    this.n2 = this.newUser;
    // var temp = toString().this.newUser
  }

  convertArray(){
    //const split = this.Consumption2.split(',')

    this.Consumption3 = JSON.parse("[" + this.Consumption2 + "]")
  }

  getWallet(){
    return this.firestore.collection("Users").snapshotChanges();
  }
  
    //Sends request for solar production data
  postConsumption(){
    return this.restApi.postConsumption().subscribe((data: {}) => {
      this.Consumption2.push(data)
  })};

      //Sends request for solar production data
  postProduction(){
    return this.restApi.postProduction().subscribe((data: {}) => {
      this.Production2.push(data)
  })};


  openSnackBar(message: string, action: string) {

    let config = new MatSnackBarConfig();


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
    this.Settings = false;
    this.Home = !this.Home;
  }

  showHistory(){
    this.History = !this.History;
    this.Home = false;
    this.App = false;
    this.Settings = false;
    this.Market = false;
  }

  showMarket(){
    this.Home = false;
    this.History = false;
    this.App = false;
    this.Settings = false;
    this.Market = !this.Market;
  }

  showSettings(){
    this.Home = false;
    this.History = false;
    this.App = false;
    this.Market = false;
    this.Settings = !this.Settings
  }

  //Sends request for solar production data
  postSurplus(){
    return this.restApi.postSurplus(this.currentUser).subscribe((data: {}) => {
      
      this.surplusTest = data;
      this.Consumption.push(data)        
      this.div1= true;
      this.makeChartData();
      console.log("test1")

  })};


  //Posting utility that is used on the home page
  addHomePosting(EnergyValue: number){


    //Create random ID
    var randDocId = Math.floor(Math.random() * 100000).toString();

    //Make a new posting using ranomd ID
    var userUpdate = this.firestore.collection("Postings").doc(randDocId)
    userUpdate.set({
      Energy: 9 ,
      Owner: this.userId,
      PostID: randDocId,
      Time: this.surplusTest.Time,
      ReservationValue: 19
    });
  
    this.openSnackBar("Posting added to marketplace", " 9 kWh" )
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
      
      //this.chartData = data;

        }
    }
}


