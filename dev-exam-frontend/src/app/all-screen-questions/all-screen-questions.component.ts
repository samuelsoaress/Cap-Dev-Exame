import { UpdateQuestions } from './updateQuestions.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
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


  constructor(private questionService: AllScreenQuestionsService, public dialog: MatDialog) {
  }
  displayedColumns: string[] = ['technology', 'complexity', 'firstPart', 'correctAnswer', 'delete', 'edit','detail'];
  dataSource = new MatTableDataSource<AllScreenModel>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.loadtable();
  }

  delete(allScreenModel: AllScreenModel) {
    this.questionService.deleteQuestion(allScreenModel.code)
      .subscribe(response => {
        console.log("Questão excluida")
      }, error => { console.log(error) }
      );
    document.location.reload(true);
  }




  loadtable() {
    let list = []
    let item = new AllScreenModel()

    this.questionService.getAllQuestions()
      .subscribe(response => {
        response.forEach(element => {
          item = new AllScreenModel()
          item.code = element.code
          item.technology = element.technology
          item.complexity = element.complexity
          item.firstPart = element.firstPart
          item.codeParts = element.codeParts
          let correct = element.correctAnswer
          item.resposta = correct
          let array = element.answers
          item.code = element.code

          for (let index = 0; index < array.length; index++) {
            if (array[index].letter === correct) {
              item.correctAnswer = array[index].text

            }
          }
          for (let index = 0; index < array.length; index++) {
            if (index === 0) {
              item.answerLetterA = array[index].text
            } if (index === 1) {
              item.answerLetterB = array[index].text
            } if (index === 2) {
              item.answerLetterC = array[index].text
            } if (index === 3) {
              item.answerLetterD = array[index].text
            } if (index === 4) {
              item.answerLetterE = array[index].text
            }

          }

          list.push(item)
        });
        this.dataSource.data = list
        this.dataSource.paginator = this.paginator;

      }, error => { console.log(error) }
      );
  }
  update(AllScreenModel: AllScreenModel) {
    const dialogRef = this.dialog.open(UpdateQuestions, {
      data: AllScreenModel
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}





