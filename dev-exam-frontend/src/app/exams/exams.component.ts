import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router'
import { QuestionsService } from 'src/app/services/questions.service'

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.scss']
})
export class ExamsComponent implements OnInit {
  questions: any
  technologys = new Set();
  complexity = new Set();
  
  constructor(private questionsService: QuestionsService, private router: Router, private route: ActivatedRoute) {
  }
  ngOnInit() {
    this.questionsService.questions()
      .subscribe(questions => {
        console.log(questions)

        
        this.questions = questions
        for (let question of questions) {
          this.technologys.add(question.technology)
          this.complexity.add(question.complexity)
        }
        

      });
  }

}
