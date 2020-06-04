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
    private backendUrl = 'http://localhost:3000/'
    constructor(private http: HttpClient) { }


    GetAllResultTeste(): Observable<any> {
        return this.http.request('GET', this.backendUrl + 'allresultteste', httpOptions)
    }

    DeleteResultTeste(code: number): Observable<any> {
        return this.http.request('DELETE', this.backendUrl + 'delteste/code/' + code, httpOptions)
    }
    UpdateResultTeste(body: any){
        console.log('entrou na update question')
        return this.http.put(this.backendUrl + 'updateteste', JSON.parse(JSON.stringify(body)), httpOptions)
    }
}

