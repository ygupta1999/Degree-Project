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

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  
  //Define API urls
  serverURL = 'http://localhost:8000';
  weatherURL = 'http://localhost:8002';

  //Hardcodded testing data
  testPost = {
    author: "Marko",
    buyer:  "Marko",
    seller: "Yash",
    quantity: "420",
  }

  //this format works for json posts
  testProd = {
    author: "Yash",
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

    //FOR DEBUGGING
    //Gets the solar production data in an array
    // getProduction(): Observable<Production> {
    //   return this.http.get<Production>(this.weatherURL + '/solar_production')
    // }

    //Sends userID to production server
    postProduction(){
      //we pass this a premade object from above
      return this.http.post(this.weatherURL + '/solar_production', this.testProd)
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
}
