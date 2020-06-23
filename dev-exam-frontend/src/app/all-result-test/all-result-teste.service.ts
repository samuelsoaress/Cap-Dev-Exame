import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

const httpOptions = {

    headers: new HttpHeaders({ 'Content-Type': 'application/json' })

};

@Injectable({
    providedIn: 'root'
})


export class AllResultTestService {
    constructor(private http: HttpClient) { }


    GetAllResultTeste(): Observable<any> {
        return this.http.request('GET','allresultteste', httpOptions)
    }

    DeleteResultTeste(code: number): Observable<any> {
        return this.http.request('DELETE','delteste/code/' + code, httpOptions)
    }
    UpdateResultTeste(body: any){
        console.log('entrou na update question')
        return this.http.put('updateteste', JSON.parse(JSON.stringify(body)), httpOptions)
    }
}

