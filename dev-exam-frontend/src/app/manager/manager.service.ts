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

    constructor(private http: HttpClient) { }

    autorizator(body: any) {

        this.http.post('autorizador', JSON.parse(body), httpOptions)
            .subscribe(
            res => {
                console.log(res)
            }
            );
        console.log('autorizador' + ' ' + body)
    }

    responsibleAll(): Observable<any> {
        return this.http.request('GET','responsavelCap', httpOptions)
    }

    examPart(): Observable<any> {
        return this.http.request('GET','composicao-prova', httpOptions)
    }

    sendCandidate(body: any) {

        this.http.post('candidate', JSON.parse(body), httpOptions)
            .subscribe(
            res => {
                console.log(res)
            }
            );
        console.log('candidate' + ' ' + body)
    }
}
