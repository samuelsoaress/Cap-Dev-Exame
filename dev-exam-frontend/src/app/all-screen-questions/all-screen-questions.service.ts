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
    constructor(private http: HttpClient) { }


    getAllQuestions(): Observable<any> {
        return this.http.request('GET','allquestion', httpOptions)
    }

    deleteQuestion(code: number): Observable<any> {
        return this.http.request('DELETE','delquestion/code/' + code, httpOptions)
    }
    UpdateQuestion(body: any){
        return this.http.put('updatequestion', JSON.parse(JSON.stringify(body)), httpOptions)
    }
}

