import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AllQuestionsModel } from './all-questions.model';

const httpOptions = {

    headers: new HttpHeaders({ 'Content-Type': 'application/json' })

};

@Injectable({
    providedIn: 'root'
})


export class AllQuestionsService {


    private backendUrl = 'http://localhost:3000/'
    private apiUrl = 'http://bralpsvvwas02:8083/'

    constructor(private http: HttpClient) {

    }

    newQuestion(AllQuestionsModel: AllQuestionsModel): Observable<any> {
        let body = {
            "altenativaA": AllQuestionsModel.answerLetterA,
            "altenativaB": AllQuestionsModel.answerLetterB,
            "altenativaC": AllQuestionsModel.answerLetterC,
            "altenativaD": AllQuestionsModel.answerLetterD,
            "altenativaE": AllQuestionsModel.answerLetterE,
            "blocoCodigo": AllQuestionsModel.codeParts,
            "codigoRespostaCorreta": AllQuestionsModel.correctAnswer,
            "codigoTecnologia": AllQuestionsModel.technology,
            "complexidade": AllQuestionsModel.complexity,
            "descricaoQuestao": AllQuestionsModel.firstPart
        }
        return this.http.post(this.backendUrl + 'newquestion', body, httpOptions)
    }

    updateQuestion(AllQuestionsModel: AllQuestionsModel): Observable<any> {
        let body = {
            "altenativaA": AllQuestionsModel.answerLetterA,
            "altenativaB": AllQuestionsModel.answerLetterB,
            "altenativaC": AllQuestionsModel.answerLetterC,
            "altenativaD": AllQuestionsModel.answerLetterD,
            "altenativaE": AllQuestionsModel.answerLetterE,
            "blocoCodigo": AllQuestionsModel.codeParts,
            "codigoRespostaCorreta": AllQuestionsModel.correctAnswer,
            "codigoTecnologia": AllQuestionsModel.technology,
            "complexidade": AllQuestionsModel.complexity,
            "descricaoQuestao": AllQuestionsModel.firstPart
        }
        return this.http.put(this.backendUrl + 'updatequestion', body, httpOptions)
    }


}

