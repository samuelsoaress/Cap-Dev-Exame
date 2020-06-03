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
    constructor(private http: HttpClient) { }


    getAllQuestions(): Observable<any> {
        return this.http.request('GET', this.backendUrl + 'allquestion', httpOptions)
    }

    deleteQuestion(code: number): Observable<any> {
        return this.http.request('DELETE', this.backendUrl + 'delquestion/code/' + code, httpOptions)
    }
    UpdateQuestion(body: any){
        console.log('entrou na update question')
        return this.http.put(this.backendUrl + 'updatequestion', JSON.parse(JSON.stringify(body)), httpOptions)
    }
}

