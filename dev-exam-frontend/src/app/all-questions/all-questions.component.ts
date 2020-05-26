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


  question: AllQuestionsModel

  constructor(private allQuestionsService: AllQuestionsService) {
    this.question = new AllQuestionsModel()
  }



  ngOnInit() {

  }
  onSubmit() {
    console.log(this.question)
    this.allQuestionsService.newQuestion(this.question).subscribe(response => {
      this.question = new AllQuestionsModel()
    }, error => { console.log(error) });


  }


}
