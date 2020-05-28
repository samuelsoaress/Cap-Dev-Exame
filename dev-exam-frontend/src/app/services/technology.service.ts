import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TechnologyService {

  private backendUrl = 'http://localhost:3000/'
  private apiUrl = 'http://bralpsvvwas02:8083/'

  constructor(private http: HttpClient) { }

  getTechnologies() : Observable<any> {
    return this.http.request('GET', this.backendUrl + '/technologies');
  }
}
