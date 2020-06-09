import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

const httpOptions = {

    headers: new HttpHeaders({ 'Content-Type': 'application/json' })

};

@Injectable({
    providedIn: 'root'
})


export class UsersService {
    constructor(private http: HttpClient) { }

    sendUser(body: any): Observable<any> {
        return this.http.post('newusuario', JSON.parse(body), httpOptions)
    }

    GetAllUsers(): Observable<any> {
        return this.http.request('GET', 'usuario', httpOptions)
    }

    DeleteUser(code: number): Observable<any> {
        return this.http.request('DELETE', 'usuario/codigo/' + code, httpOptions)
    }

    UpdateUser(body: any) {
        return this.http.put('update', JSON.parse(JSON.stringify(body)), httpOptions)
    }
}

