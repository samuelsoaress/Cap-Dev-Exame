import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Candidate } from 'src/app/_models/Candidate.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<Candidate>;
  public currentUser: Observable<Candidate>;

  loggedInUserInfo: {};
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<Candidate>(JSON.parse(JSON.stringify(localStorage.getItem('currentUser'))));
    this.currentUser = this.currentUserSubject.asObservable();
  }
  public get currentUserValue(): Candidate {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    return this.http.post<any>(`authenticate`, { email, password })
      .pipe(map(user => {
        if (user && user.token) {
          // store user details in local storage to keep user logged in
          localStorage.setItem('currentUser', JSON.stringify(user.result));
          this.currentUserSubject.next(user);
        }
        return user;
      }));
  }

  logout() {
    // remove user data from local storage for log out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
