import { QuestionsService } from 'src/app/services/questions.service';
import { AllQuestionsService } from './../all-questions/all-questions.service';
import { AllQuestionsModel } from './../all-questions/all-questions.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-questions',
  templateUrl: './edit-questions.component.html',
  styleUrls: ['./edit-questions.component.scss']
})
export class EditQuestionsComponent implements OnInit {

  questao: any

  question: AllQuestionsModel


  constructor(private allQuestionsService: AllQuestionsService, private quest: QuestionsService) {
    this.question = new AllQuestionsModel()
  }

  ngOnInit() {
    this.quest.questions()
      .subscribe(retorno => {
        this.questao = retorno
      })

  }
  onSubmit() {
    console.log(this.question)
    this.allQuestionsService.updateQuestion(this.question)
      .subscribe(response => {
        this.question = new AllQuestionsModel()
      }, error => { console.log(error) });

  }
  
}
