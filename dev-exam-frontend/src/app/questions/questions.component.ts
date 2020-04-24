import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions.service'
import { ActivatedRoute } from '@angular/router'
import { NgForm } from '@angular/forms';
import * as $ from 'jquery';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

  questions: any
  timeLeft: number = 1800;
  interval;
  minute: number
  second: number
  time: any
  constructor(private questionsService: QuestionsService, private router: Router, private route: ActivatedRoute) {
  }


  twoHouses(value) {
    if (value <= 9) {
      value = "0" + value
    }
    return value
  }

  format(s) {
    this.minute = this.twoHouses(Math.trunc((s % 3600) / 60))
    this.second = this.twoHouses((s % 3600) % 60)

    return this.minute + ":" + this.second;
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        this.time = this.format(this.timeLeft)
      } else {
        this.timeLeft = 60;
      }
      if (this.timeLeft == 0) {
        let element: HTMLElement = document.getElementById('submit') as HTMLElement;
        element.click();
      }
    }, 1000)
  }

  ngOnInit() {
    const examCode: string = this.route.snapshot.queryParamMap.get('code');
    this.questionsService.getQuestions(examCode)
      .subscribe(questions => {
        console.log(questions)
        this.questions = questions
      });
    this.startTimer()

    $(window).scroll(function () {
      if ($(this).scrollTop() > 1) {
        $('.timer').fadeIn('slow');
      }
    });

  }

  onSubmit(value: any) {
    this.questionsService.sendAnswers(JSON.stringify(value))
    this.router.navigateByUrl('/success');
  }


}
