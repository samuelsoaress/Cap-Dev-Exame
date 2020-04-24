import { QuestionsComponent } from './../questions/questions.component';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  private apiUrl = 'http://127.0.0.1:3000/'

  constructor(private http: HttpClient) { }

  getQuestions(examCode: string): Observable<any> {
    return this.http.request('GET', this.apiUrl + 'exam?code=' + examCode);
  }
  questions(): Observable<any> {
    return this.http.request('GET', this.apiUrl + 'questions');
  }

  sendAnswers(body: any){

    this.http.post(this.apiUrl + 'answers', JSON.parse(body), {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
    }).subscribe(
      res => {
          console.log(res)
      }
    );
    console.log(this.apiUrl + 'answers' + ' ' + body)
  }
}
