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
  timeLeft: number = 15;
  interval;

  constructor(private questionsService: QuestionsService, private router: Router, private route: ActivatedRoute) {
  }


  pauseTimer() {
    clearInterval(this.interval);
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

  startTimer() {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 60;
      }
      if(this.timeLeft == 0){
        let element: HTMLElement = document.getElementById('submit') as HTMLElement;
        element.click();
      }
    },1000)
  }


}
