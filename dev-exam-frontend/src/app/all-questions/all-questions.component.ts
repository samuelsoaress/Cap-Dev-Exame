import { AllQuestionsService } from './all-questions.service';
import { AllQuestionsModel } from './all-questions.model';
import { Component, OnInit } from '@angular/core';

import { QuestionsService } from 'src/app/services/questions.service';

@Component({
  selector: 'app-all-questions',
  templateUrl: './all-questions.component.html',
  styleUrls: ['./all-questions.component.scss']
})
export class AllQuestionsComponent implements OnInit {

  questao: any


  question: AllQuestionsModel

  constructor(private allQuestionsService: AllQuestionsService, private quest: QuestionsService) {
    this.question = new AllQuestionsModel()
  }



  ngOnInit() {
    this.quest.questions()
    .subscribe(questions => {
      this.questao = questions
      console.log(this.questao)
    });

  }
  onSubmit() {
    console.log(this.question)
    this.allQuestionsService.newQuestion(this.question)
      .subscribe(response => {
        this.question = new AllQuestionsModel()
      }, error => { console.log(error) });


  }


}
