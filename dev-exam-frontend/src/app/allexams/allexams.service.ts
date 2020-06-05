import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from "../../../src/environments/environment";

const httpOptions = {

    headers: new HttpHeaders({ 'Content-Type': 'application/json' })

};

@Injectable({
    providedIn: 'root'
})


export class AllExamsService {
    constructor(private http: HttpClient) { }


    getAllExams(): Observable<any> {
        return this.http.request('GET', 'allexams', httpOptions)
    }

    deleteExam(code: string): Observable<any> {
        return this.http.request('DELETE','delexam/code/' + code, httpOptions)
    }
}

