import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions.service';
import * as $ from 'jquery';

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

  constructor(private questionsService: QuestionsService, private router: Router, private route: ActivatedRoute) {
  }


  addLine(arg1,arg2,arg3){
    var newRow = $("<tr>");
    var cols = "";	
    cols += '<td readonly>'+arg1 +'</td>';
    cols += '<td readonly>'+arg2 +'</td>';
    cols += '<td readonly >'+arg3 +'</td>';
    cols += '<td>';	    
    cols += '<button class="btn-danger btn btn-xs" onclick="onDelete(this)">Remover</button>';
    cols += '</td>';	
    newRow.append(cols);
    $("#tabela-pedido").append(newRow);
  }

  add(event:Event){
    this._inputQuantity = <HTMLInputElement>document.querySelector('#testAmount');
    this._inputTechnology = <HTMLInputElement>document.querySelector('#technology');
    this._inputComplexity = <HTMLInputElement>document.querySelector('#complexity');
    
    this.addLine(this._inputTechnology.value,this._inputComplexity.value,this._inputQuantity.value)
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
}
