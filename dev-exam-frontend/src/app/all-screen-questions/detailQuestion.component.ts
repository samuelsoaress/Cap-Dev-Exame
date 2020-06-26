import { AllScreenQuestionsService } from './all-screen-questions.service';
import { AllScreenModel } from './all-screen.model';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'detail-question',
    templateUrl: './detailQuestion.html',
    styleUrls: ['./all-screen-questions.component.scss']
})
export class DetailQuestion implements OnInit {
    codeParts: string
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


    constructor(public dialogRef: MatDialogRef<DetailQuestion>,
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
        if(this.answerLetterA === this.correctAnswer){
          let elementCorrect: HTMLElement = document.querySelector('#a') as HTMLElement
          elementCorrect.classList.add("correctAnswer");
        }else if(this.answerLetterB === this.correctAnswer){
          let elementCorrect: HTMLElement = document.querySelector('#b') as HTMLElement
          elementCorrect.classList.add("correctAnswer");
        }else if(this.answerLetterC === this.correctAnswer){
          let elementCorrect: HTMLElement = document.querySelector('#c') as HTMLElement
          elementCorrect.classList.add("correctAnswer");
        }else if(this.answerLetterD === this.correctAnswer){
          let elementCorrect: HTMLElement = document.querySelector('#d') as HTMLElement
          elementCorrect.classList.add("correctAnswer");
        }else if(this.answerLetterE === this.correctAnswer){
          let elementCorrect: HTMLElement = document.querySelector('#e') as HTMLElement
          elementCorrect.classList.add("correctAnswer");
        }
    }
}
