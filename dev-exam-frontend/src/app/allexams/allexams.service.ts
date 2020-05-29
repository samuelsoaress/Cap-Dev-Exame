import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

const httpOptions = {

    headers: new HttpHeaders({ 'Content-Type': 'application/json' })

};

@Injectable({
    providedIn: 'root'
})


export class AllExamsService {
    private backendUrl = 'http://localhost:3000/'
    private apiUrl = 'http://bralpsvvwas02:8083/'
    constructor(private http: HttpClient) { }


    getAllExams(): Observable<any> {
        return this.http.request('GET', this.backendUrl + 'allexams', httpOptions)
    }

}

