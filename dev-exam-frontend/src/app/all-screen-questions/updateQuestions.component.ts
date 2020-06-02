import { AllScreenQuestionsService } from './all-screen-questions.service';
import { AllScreenModel } from './all-screen.model';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'update-questions',
    templateUrl: './updateQuestions.html'
})
export class UpdateQuestions implements OnInit {
    codeParts: number
    technology: string
    complexity: string
    firstPart: string
    answerLetterA: string
    answerLetterB: string
    answerLetterC: string
    answerLetterD: string
    answerLetterE: string
    correctAnswer: string
    resposta: string
    code: number


    constructor(private AllScreenQuestionsService: AllScreenQuestionsService,
        public dialogRef: MatDialogRef<UpdateQuestions>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        console.log('data', this.data);
    }


    ngOnInit() {
        this.code = this.data.code
        this.codeParts = this.data.codeParts
        this.complexity = this.data.complexity
        this.correctAnswer = this.data.correctAnswer
        this.firstPart = this.data.firstPart
        this.technology = this.data.technology
        this.resposta = this.data.resposta
        this.answerLetterA = this.data.answerLetterA
        this.answerLetterB = this.data.answerLetterB
        this.answerLetterC = this.data.answerLetterC
        this.answerLetterD = this.data.answerLetterD
        this.answerLetterE = this.data.answerLetterE

    }
    onSubmit(body: any) {
        console.log(body)
        body['codigo'] = this.code
        this.AllScreenQuestionsService.UpdateQuestion(body)
            .subscribe(question => {
                console.log("Questão atualizada")
            }, error => { console.log(error) }
            );

    }
}