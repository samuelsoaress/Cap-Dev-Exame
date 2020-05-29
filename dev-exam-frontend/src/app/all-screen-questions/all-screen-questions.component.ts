import { AllScreenQuestionsService } from './all-screen-questions.service';
import { AllScreenModel } from './all-screen.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-all-screen-questions',
  templateUrl: './all-screen-questions.component.html',
  styleUrls: ['./all-screen-questions.component.scss']
})
export class AllScreenQuestionsComponent implements OnInit {
  constructor(private questionService: AllScreenQuestionsService) {
  }
  displayedColumns: string[] = ['technology', 'complexity', 'firstPart', 'correctAnswer', 'delete', 'edit'];
  dataSource = new MatTableDataSource<AllScreenModel>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.loadtable();
  }

  loadtable() {
    let list = []
    let item = new AllScreenModel()

    this.questionService.getAllQuestions()
      .subscribe(response => {
        response.forEach(element => {
          item = new AllScreenModel()
          item.technology = element.technology
          item.complexity = element.complexity
          item.firstPart = element.firstPart
          let correct = element.correctAnswer

          let array = element.answers
          for (let index = 0; index < array.length; index++) {
            if (array[index].letter === correct) {
              item.correctAnswer = array[index].text
            }
          }

          list.push(item)
        });
        this.dataSource.data = list
        this.dataSource.paginator = this.paginator;

      }, error => { console.log(error) }
      );
  }
}





