import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions.service'
import { ActivatedRoute } from '@angular/router'
import { NgForm } from '@angular/forms';
import { AuthService } from '../core/auth/auth.service';
import * as $ from 'jquery';
import { MatDialog } from '@angular/material/dialog';
import { DialogQuestions } from './dialog-questions';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

  candidateName: string
  btndisable = true
  questions: any
  timeLeft: number = 7201; //300
  interval;
  minute: any
  second: any
  hour: any
  time: any
  public currentUser;
  constructor(
    private questionsService: QuestionsService,
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthService,
    public dialog: MatDialog) {
    this.currentUser = localStorage.getItem('currentUser') ? JSON.parse(JSON.stringify(localStorage.getItem('currentUser'))) : '';
  }

  openDialog(name:any) {
    const dialogRef = this.dialog.open(DialogQuestions, {
      data: {"nome":name,"time":"2:00"}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.startTimer()
    });
  }

  format(s, with_seg = true) {
    this.hour = Math.floor(s / 3600);
    this.minute = Math.floor((s % 3600) / 60)
    this.second = s % 60

    this.minute = this.minute < 10 ? '0' + this.minute : this.minute;
    this.second = this.second < 10 ? '0' + this.second : this.second;
    this.hour = this.hour < 10 ? '0' + this.hour : this.hour;

    if (with_seg) {
      return this.hour + ":" + this.minute + ":" + this.second;
    }

    return this.hour + ":" + this.minute;
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
      if (this.timeLeft == 299) {
        let elementTime: HTMLElement = document.querySelector('#timer') as HTMLElement
        elementTime.classList.add("end-timer");
      }
    }, 1000)
  }

  ngOnInit() {
    const user: string = this.route.snapshot.queryParamMap.get('user');
    const autorizador: string = this.route.snapshot.queryParamMap.get('autorizador');
    this.questionsService.getCandidate(user, autorizador)
      .subscribe(async data => {
        this.candidateName = data[0].nome
        await this.openDialog(data[0].nome)
      });

    const examCode: string = this.route.snapshot.queryParamMap.get('code');
    this.questionsService.getQuestions(examCode)
      .subscribe(questions => {
        this.questions = questions
      });

    $(window).scroll(function () {
      $('.timer').fadeIn('slow');
    });
  }
  onSubmit(value: any) {
    const examCode: string = this.route.snapshot.queryParamMap.get('code');
    this.questionsService.sendAnswers(JSON.stringify(value), examCode)
    this.authenticationService.logout();
    this.router.navigateByUrl('/success');
  }


}
