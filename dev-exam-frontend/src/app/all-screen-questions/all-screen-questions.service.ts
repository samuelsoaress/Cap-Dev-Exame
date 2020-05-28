import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

const httpOptions = {

    headers: new HttpHeaders({ 'Content-Type': 'application/json' })

};

@Injectable({
    providedIn: 'root'
})


export class AllScreenQuestionsService {
    private backendUrl = 'http://localhost:3000/'
    private apiUrl = 'http://bralpsvvwas02:8083/'
    constructor(private http: HttpClient) { }


    getAllQuestions(): Observable<any> {
        return this.http.request('GET', this.backendUrl + 'allquestion', httpOptions)
    }

}

