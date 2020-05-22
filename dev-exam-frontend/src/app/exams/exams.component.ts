import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions.service';
import * as $ from 'jquery';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.scss']
})
export class ExamsComponent implements OnInit {
  questions: any
  technologys = new Set();
  complexity = new Set();
  exam: Array<any> = []
  exame: any
  newExam: Array<any> = [];
  _inputTechnology: HTMLInputElement;
  _inputQuantity: HTMLInputElement;
  _inputComplexity: HTMLInputElement;
  contLinha: number

  constructor(private questionsService: QuestionsService, private router: Router, private route: ActivatedRoute) {
  }


  addLine(arg1, arg2, arg3) {
    var newRow = $("<tr>");
    var cols = "";
    cols += '<td readonly>' + arg1 + '</td>';
    cols += '<td readonly>' + arg2 + '</td>';
    cols += '<td readonly >' + arg3 + '</td>';
    cols += '<td>';
    cols += '<button class="btn-danger btn btn-xs" onclick="onDelete(this)" type="button">Remover</button>';
    cols += '</td>';
    newRow.append(cols);
    $("#tabela-prova").append(newRow);
    this.newExam.push(this.exam)
    this.exam = []
  }

  add() {
    this._inputQuantity = <HTMLInputElement>document.querySelector('#testAmount');
    this._inputTechnology = <HTMLInputElement>document.querySelector('#technology');
    this._inputComplexity = <HTMLInputElement>document.querySelector('#complexity');
    this.exam.push(this._inputQuantity.value)
    this.exam.push(this._inputTechnology.value)
    this.exam.push(this._inputComplexity.value)
    this.addLine(this._inputTechnology.value, this._inputComplexity.value, this._inputQuantity.value)
  }


  ngOnInit() {
    this.exame = {};
    this.questionsService.questions()
      .subscribe(questions => {
        this.questions = questions
        console.log(questions)
      });
  }

  onSubmit(value: any) {
    console.log(value)
    let dict = { "nomeTeste": value.nomeTeste }
    for (let i = 0; i < this.newExam.length; i++) {
      dict['valor' + i] = this.newExam[i]
    }
    this.questionsService.sendExam(JSON.stringify(dict))
    console.log(dict)
    this.router.navigateByUrl('/success');
  }
}
