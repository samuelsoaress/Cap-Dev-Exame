import { AllScreenQuestionsService } from './all-screen-questions.service';
import { QuestionsService } from 'src/app/services/questions.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-screen-questions',
  templateUrl: './all-screen-questions.component.html',
  styleUrls: ['./all-screen-questions.component.scss']
})
export class AllScreenQuestionsComponent implements OnInit {
  exam: Array<any> = []
  allQuestions: Array<any> = [];

  constructor(private questionsService: QuestionsService, private AllScreenQuestionsService: AllScreenQuestionsService) { }

  addLine(arg1, arg2, arg3, arg4, arg5 ) {
    var newRow = $("<tr>");
    var cols = "";
    cols += '<td readonly>' + arg1 + '</td>';
    cols += '<td readonly>' + arg2 + '</td>';
    cols += '<td readonly>' + arg3 + '</td>';
    cols += '<td readonly>' + arg4 + '</td>';
    cols += '<td readonly>' + arg5 + '</td>';
    cols += '<td>';
    cols += '<button class="btn-danger btn btn-xs" onclick="onDelete(this)" type="button">Remover</button><button type="button" class="btn btn-info">Editar</button>';
    cols += '</td>';
    newRow.append(cols);
    $("#tabela-questoes").append(newRow);
    this.allQuestions.push(this.exam)
    this.exam = []
  }

  

  ngOnInit() {
    this.AllScreenQuestionsService.getAllQuestions()

  }

}
