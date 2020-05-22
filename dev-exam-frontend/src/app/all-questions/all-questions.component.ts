import { Component, OnInit } from '@angular/core';

import { QuestionsService } from 'src/app/services/questions.service';

@Component({
  selector: 'app-all-questions',
  templateUrl: './all-questions.component.html',
  styleUrls: ['./all-questions.component.scss']
})
export class AllQuestionsComponent implements OnInit {
  question: Array<any> = []


  constructor(private questionsService: QuestionsService) {
  }

  addQuestion() {

  }

  ngOnInit() {
  }
  onSubmit(value: any) {
    console.log(value)
  }

}
