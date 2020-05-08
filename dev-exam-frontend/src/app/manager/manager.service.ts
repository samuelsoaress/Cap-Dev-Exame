import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {

  headers: new HttpHeaders({ 'Content-Type': 'application/json' })

};

@Injectable({
    providedIn: 'root'
  })

export class ManagerService {

    private apiUrl = 'http://bralpsvvwas02:8083/'

    constructor(http: HttpClient){ }

    autorizator(body: any) {
        
            this.http.post(this.apiUrl + 'autorizador/add', JSON.parse(body), httpOptions)
            .subscribe(
              res => {
                console.log(res)
              }
            );
            console.log(this.apiUrl + 'autorizador/add' + ' ' + body)
          }
}