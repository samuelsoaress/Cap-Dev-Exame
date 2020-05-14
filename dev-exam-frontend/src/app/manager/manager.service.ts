import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ManagerComponent } from './manager.component'

const httpOptions = {

    headers: new HttpHeaders({ 'Content-Type': 'application/json' })

};
@Injectable({
    providedIn: 'root'
})

export class ManagerService {

    private apiUrl = 'http://bralpsvvwas02:8083/'

    private backendUrl = 'http://bralpsvvwas02:3000/'

    constructor(private http: HttpClient) { }

    autorizator(body: any) {

        this.http.post(this.backendUrl + 'autorizador', JSON.parse(body), httpOptions)
            .subscribe(
            res => {
                console.log(res)
            }
            );
        console.log(this.backendUrl + 'autorizador' + ' ' + body)
    }

    examPart(): Observable<any> {
        return this.http.request('GET',this.backendUrl + 'composicao-prova', httpOptions)
    }

    sendCandidate(body: any) {

        this.http.post(this.backendUrl + 'candidate', JSON.parse(body), httpOptions)
            .subscribe(
            res => {
                console.log(res)
            }
            );
        console.log(this.apiUrl + 'candidate' + ' ' + body)
    }
}
