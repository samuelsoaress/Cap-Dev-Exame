import { QuestionsComponent } from './../questions/questions.component';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
const httpOptions = {

  headers: new HttpHeaders({ 'Content-Type': 'application/json' })

};
@Injectable({
  providedIn: 'root'
})


export class QuestionsService {


  constructor(private http: HttpClient) { }

  getQuestions(examCode: string): Observable<any> {
    return this.http.request('GET','exam?code=' + examCode);
  }

  questions(): Observable<any> {
    return this.http.request('GET','technologies', httpOptions);
  }

  sendAnswers(body: any, examCode) {

    this.http.post('answers?code=' + examCode, JSON.parse(body), {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }).subscribe(
      res => {
        console.log(res)
      }
    );
    console.log('answers' + ' ' + body)
  }

  sendExam(body: any): Observable<any> {
    return this.http.post('newExam', JSON.parse(body), httpOptions)
  }
}
