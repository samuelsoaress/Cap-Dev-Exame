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

  private backendUrl = 'http://localhost:3000/'
  private apiUrl = 'http://bralpsvvwas02:8083/'

  constructor(private http: HttpClient) { }

  getQuestions(examCode: string): Observable<any> {
    return this.http.request('GET', this.backendUrl + 'exam?code=' + examCode);
  }
  
  questions(): Observable<any> {
    return this.http.request('GET', this.apiUrl + 'tecnologia/', httpOptions);
  }

  sendAnswers(body: any) {

    this.http.post(this.backendUrl + 'answers', JSON.parse(body), {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }).subscribe(
      res => {
        console.log(res)
      }
    );
    console.log(this.backendUrl + 'answers' + ' ' + body)
  }

  sendExam(body: any) {
    this.http.post(this.backendUrl + 'newExam', JSON.parse(body), {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }).subscribe(
      res => {
        console.log(res)
      }
    );
    console.log(this.backendUrl + 'newExam' + ' ' + body)
  }
}
