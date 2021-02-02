import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  //URL of django sever
  baseurl = 'http://127.0.0.1:8000';

  //Headers for HTTP
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient) { }

  //function for getting movie data from django
  getAllMovies(): Observable<any>{
    return this.http.get(this.baseurl + '/movies/', 
    {headers: this.httpHeaders});

  }
}
