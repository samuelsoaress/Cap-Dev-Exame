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
    cols += '<td readonly>' + this._inputTechnology.value + '</td>';
    cols += '<td readonly>' + this._inputComplexity.value + '</td>';
    cols += '<td readonly >' + this._inputQuantity.value + '</td>';
    cols += '<td>';
    cols += '<button class="btn-danger btn btn-xs" onclick="onDelete(this)" type="button">Remover</button>';
    cols += '</td>';
    newRow.append(cols);
    $("#tabela-prova").append(newRow);
  }

  add(event: Event) {
    this._inputQuantity = <HTMLInputElement>document.querySelector('#testAmount');
    this._inputTechnology = <HTMLInputElement>document.querySelector('#technology');
    this._inputComplexity = <HTMLInputElement>document.querySelector('#complexity');

    this.addLine(this._inputTechnology.value, this._inputComplexity.value, this._inputQuantity.value)
    this.contLinha++
  }

  line(arg1, arg2, arg3) {
    while (this.contLinha >= 0) {
      this.contLinha--
      return arg1 + " " + arg2 + " " + arg3
    }

  }


  ngOnInit() {
    this.questionsService.questions()
      .subscribe(questions => {
        this.questions = questions
        for (let question of questions) {
          this.technologys.add(question.technology)
          this.complexity.add(question.complexity)
        }
      });
  }
  onSubmit(value: any) {
    let imprime = this.line(this._inputComplexity.value, this._inputTechnology.value, this._inputQuantity.value);
    console.log( imprime + " linha: " + this.contLinha)
    this.router.navigateByUrl('/success');
  }
}
