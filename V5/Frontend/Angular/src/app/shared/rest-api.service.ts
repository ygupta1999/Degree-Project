import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Chain } from '../shared/chain';
import { Production } from '../shared/production';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

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
  
  //Define API urls
  serverURL = 'http://localhost:8003';
  weatherURLV5 = 'http://localhost:8004';
  v5URL = 'http://localhost:8003';
  v4URL = 'http://localhost:8000';

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

  constructor(private http: HttpClient) { }

  /*========================================
    CRUD Methods for consuming RESTful API
  =========================================*/

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  }

  
    // HttpClient API get() method => Fetch chain data
    getChain(): Observable<Chain> {
      return this.http.get<Chain>(this.serverURL + '/chain')
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
    }

    //Sends userID to production server
    postProduction(){
      //we pass this a premade object from above
      return this.http.post(this.weatherURLV5 + '/solar_production', this.testProd)
      //TODO
      //Returns or displays 2 production datas
    }

    //Posts dummy data to the chain
    postChain(object: transaction): any {
      this.http.post<Chain>(this.serverURL + '/new_transaction', object)
      .toPromise()
      .then(data => {
        console.log(data);
      })
    }

    //Connect to other networks
    connectToChain(value: port): any {
      this.http.post(this.v5URL + '/register_with', value)
      .toPromise()
      .then(data => {
        console.log(data);
      })
    }
    
    //get the Consumption from the weather server
    ///THIS IS BIDDDDDDDD
    postConsumption(){
      return this.http.post(this.weatherURLV5 + '/solar_consumption', this.testProd)
    }

    postBid(bid: bid){
      return this.http.post(this.weatherURLV5 + '/validate_bid', bid)
    }

    //get the surplus from the server from the weather server
    postSurplus(){
      return this.http.post(this.weatherURLV5 + '/surplus', this.testUid)
    }

    //get the surplus from the server from the weather server
    // postBid(){
      
    //   let bid = {
    //     uid:  "mFSXDDIf4rc0IfIYD6JVGAbmiaf1",
    //     Post_Id: "444",
    //     Amount: 15,
    //   }
    //   return this.http.post(this.weatherURLV5 + '/solar_consumption', bid)
    // }


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

  /////////////////////////FOR DEVELOPMENT AND TESTING //////////////////////////////////////////

  //FOR DEBUGGING
  //Gets the solar production data in an array
  // getProduction(): Observable<Production> {
  //   return this.http.get<Production>(this.weatherURL + '/solar_production')
  // }


  /////////////////////////END DEVELOPMENT AND TESTING //////////////////////////////////////////
}
