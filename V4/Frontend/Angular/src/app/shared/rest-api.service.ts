import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Chain } from '../shared/chain';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  
  // Define API
  apiURL = 'http://localhost:8000';

  //Hardcodded testing data
  testPost = {
    author: "Daddy",
    content: "6inchs",
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
  
    // HttpClient API get() method => Fetch employees list
    getChain(): Observable<Chain> {

      //This function is able to ping the server but is not able to parse the response
      return this.http.get<Chain>(this.apiURL + '/chain')
      .pipe(
        retry(1),
        catchError(this.handleError)
      )

      //return this.http.request<Chain>('GET', this.http + '/chain', {responseType:'json'});
    }

    postChain() {
      this.http.post<Chain>(this.apiURL + '/new_transaction', this.testPost)
      .toPromise()
      .then(data => {
        console.log(data);
      })
      //.pipe(
      //  retry(1),
      //  catchError(this.handleError)
      //)
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
