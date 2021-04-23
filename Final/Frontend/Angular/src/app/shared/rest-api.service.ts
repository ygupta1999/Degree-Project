import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Chain } from '../shared/chain';
import { Production } from '../shared/production';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { FirebaseService } from '../services/firebase.service';
import { map } from 'jquery';


export interface transaction {
  author: String;
  buyer:  String;
  seller: String;
  quantity: number;
}

export interface bid {
  uid:  String;
  Post_Id: String;
  Amount: number;
}

export interface port {
  node_address: String;
}

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  currentUid = ""
  
  //Define API urls
  serverURL = 'http://localhost:8000';
  weatherURLV5 = 'http://localhost:8004';
  serverURLV6 = 'http://localhost:8001';

  v5URL = 'http://localhost:8003';
  v4URL = 'http://localhost:8000';

  serverURLV17 = 'http://localhost:8002';

  //Hardcodded testing data
  testPost = {
    author: "Marko",
    buyer:  "Marko",
    seller: "Yash",
    quantity: "420",
  }

  testBid = {
    uid:  "NOtcKxDvogdK9JbDTacpUbb1EiC2",
    Post_Id: "444",
    Amount: 15,
  }

  //this format works for json posts
  testProd = {
    author: "NOtcKxDvogdK9JbDTacpUbb1EiC2",
  }

  testUid = {
    author: "NOtcKxDvogdK9JbDTacpUbb1EiC2",
  }

  newUser: "" | any;

  neswAPI = "cc23f71419a141f29b60c8f663582f12"

  API_KEY: string = 'cc23f71419a141f29b60c8f663582f12';
  url: string = 'http://newsapi.org/v2/everything?qInTitle=';
  params: string = '&inflation&from=2021-04-01&sortBy=relevancy&apiKey=' //REPLACE YYYY-MM-DD WITH VALID DATE WITHIN ONE MONTH OF RUNNING APP


  constructor(
    private http: HttpClient,
    public firebaseService : FirebaseService,
    ) { 

      //Get current user
      this.newUser = firebaseService.firebaseAuth.onAuthStateChanged((user) => {
        if (user) {
          this.newUser = user.uid
        }
      })
    }


  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  }

  
    // HttpClient API get() method => Fetch chain data
    getChain(): Observable<Chain> {
      return this.http.get<Chain>(this.serverURLV17 + '/chain')
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
    }

    //Sends userID to production server
    postProduction(){
      //we pass this a premade object from above
      return this.http.post<any[]>(this.serverURLV17 + '/solar_production', this.testProd)
      //TODO
      //Returns or displays 2 production datas
    }

    //Posts dummy data to the chain
    postChain(object: transaction): any {
      this.http.post<Chain>(this.serverURLV17 + '/new_transaction', object)
      .toPromise()
      .then(data => {
        console.log(data);
      })
    }

    //Connect to other networks
    connectToChain(value: port): any {
      this.http.post(this.serverURLV17 + '/register_with', value)
      .toPromise()
      .then(data => {
        console.log(data);
      })
    }
    
    //get the Consumption from the weather server
    ///THIS IS BIDDDDDDDD
    postConsumption(){
      return this.http.post<any[]>(this.serverURLV17 + '/solar_consumption', this.testProd)
    }

    postBid(bid: bid){
      return this.http.post(this.serverURLV17 + '/validate_bid', bid)
    }

    //get the surplus from the server from the weather server
    postSurplus(uid: string){
      
      //this.testProd.author = uid.toString();
      return this.http.post<any[]>(this.serverURLV17 + '/surplus',  this.testProd)
  
    }

    // Error handling 
    handleError(error: { error: { message: string; }; status: any; message: any; }) {
      let errorMessage = '';
      if(error.error instanceof ErrorEvent) {
        // Get client-side error
        errorMessage = error.error.message;
      } else {
        // Get server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      window.alert(errorMessage);
      return throwError(errorMessage);
    }

    //NEWS STUFF

    initSources(){
      return this.http.get('https://newsapi.org/v2/sources?language=en&apiKey='+this.neswAPI);
    }
    initArticles(){
      return this.http.get('https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey='+this.neswAPI);
    }
    getArticlesByID(source: String){
      return this.http.get('https://newsapi.org/v2/top-headlines?sources='+source+'&apiKey='+this.neswAPI);
    }

    getNewsServiceByCountry(country: string) {
      return this.http.get(this.url + country + this.params + this.API_KEY);
    }

  /////////////////////////FOR DEVELOPMENT AND TESTING //////////////////////////////////////////

  //FOR DEBUGGING
  //Gets the solar production data in an array
  // getProduction(): Observable<Production> {
  //   return this.http.get<Production>(this.weatherURL + '/solar_production')
  // }


  /////////////////////////END DEVELOPMENT AND TESTING //////////////////////////////////////////
}
