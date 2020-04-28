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

  forArray(){
    return this.newExam;
  }

  add(event:Event){
    this._inputQuantity = <HTMLInputElement>document.querySelector('#testAmount');
    this._inputTechnology = <HTMLInputElement>document.querySelector('#technology');
    this._inputComplexity = <HTMLInputElement>document.querySelector('#complexity');
    const exam = [
      this._inputQuantity.value,
      this._inputTechnology.value,
      this._inputComplexity.value
    ]
    console.log(this._inputComplexity.value)
    console.log("entrou")
    this.newExam.push(exam)
    
    for(var index in this.newExam)
    { 
        console.log(this.newExam[index]);  // output: Apple Orange Banana
    }
    var newRow = $("<tr>");
    var cols = "";	
    cols += '<td>'+this._inputTechnology.value +'</td>';
    cols += '<td>'+this._inputComplexity.value +'</td>';
    cols += '<td>'+this._inputQuantity.value +'</td>';
    cols += '<td>';	    
    cols += '<button onclick="RemoveTableRow(this)" type="button">Remover</button>';
    cols += '</td>';	
    newRow.append(cols);
    $("#tabela-pedido").append(newRow);
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
