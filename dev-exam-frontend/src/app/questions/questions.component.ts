import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions.service'
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

  questions: any

  constructor(private questionsService: QuestionsService, private router: Router) {
  }

  ngOnInit() {
    this.questionsService.getQuestions()
      .subscribe(questions => {
        console.log(questions)
        this.questions = questions
      });
  }

  onSubmit(value: any) {
    this.questionsService.sendAnswers(JSON.stringify(value))
    this.router.navigateByUrl('/success');
  }

}
