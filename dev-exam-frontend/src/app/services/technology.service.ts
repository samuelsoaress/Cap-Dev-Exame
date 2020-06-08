import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Technology } from '../models/technology';


@Injectable({
  providedIn: 'root'
})
export class TechnologyService {

  private apiUrl = 'http://bralpsvvwas02:8083/'

  constructor(private http: HttpClient) { }

  getTechnologies() : Observable<Technology[]> {
    return this.http.get<Technology[]>('technologies');
  }

  createTechnology(technology: Technology): Observable<Technology> {
    return this.http.post<Technology>('technologies', technology, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
  }

  updateTechnology(technology: Technology): Observable<Technology> {
    return this.http.put<Technology>('technologies', technology, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  deleteTechnology(codigo: any): Observable<any> {
    return this.http.delete('technologies/'+codigo);
  }
}
