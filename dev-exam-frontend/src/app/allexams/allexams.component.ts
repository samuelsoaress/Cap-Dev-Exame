import { AllExamsService } from './allexams.service';
import { AllExamsModel } from './allexams.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UpdateExam } from './updateExam.component'

@Component({
  selector: 'app-allexams',
  templateUrl: './allexams.component.html',
  styleUrls: ['./allexams.component.scss']
})
export class AllexamsComponent implements OnInit {

  displayedColumns: string[] = ['nomeTeste', 'complexity', 'tecnology', 'qtdQuestions', 'delete', 'edit'];
  dataSource = new MatTableDataSource<AllExamsModel>();

  constructor(private allExamsService: AllExamsService, public dialog: MatDialog) { }


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  ngOnInit() {
    this.loadtable();
  }
  
  delete(allExamsModel: AllExamsModel) {
    this.allExamsService.deleteExam(allExamsModel.codigoProva)
    .subscribe(response => {
      console.log("Exame excluida")
    }, error => { console.log(error) }
  );
  document.location.reload(true);
}

loadtable() {
  let array = []
  let item = new AllExamsModel()
    this.allExamsService.getAllExams()
    .subscribe(response => {
      response.forEach(element => {
        item = new AllExamsModel()
        item.nomeTeste = element.nomeTeste
        let sum;
        let complexity;
          let tecnology
          for (let index = 0; index < element.list.length; index++) {
            let exam = element.list[index];
            if (index > 0) {
              complexity += ", " + exam.complexidade
              tecnology += ", " + exam.tecnologia
              sum += parseInt(exam.quantidadeQuestoes)
            } else {
              complexity = exam.complexidade
              tecnology = exam.tecnologia
              sum = parseInt(exam.quantidadeQuestoes)
            }
            item.codigoProva = element.codigoProva
            item.complexity = complexity
            item.tecnology = tecnology
            item.qtdQuestions = sum
          }
          
          array.push(item)
        });
        this.dataSource.data = array
        this.dataSource.paginator = this.paginator;

      }, error => { console.log(error) }
    );
  }
  
  update(AllExamsModel:AllExamsModel) {
    let config = new MatDialogConfig();
    const dialogRef = this.dialog.open(UpdateExam,{
      data: AllExamsModel
    });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}