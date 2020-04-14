import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions.service'
import { ActivatedRoute } from '@angular/router'
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

  questions: any

  constructor(private questionsService: QuestionsService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    const examCode: string = this.route.snapshot.queryParamMap.get('code');
    this.questionsService.getQuestions(examCode)
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
