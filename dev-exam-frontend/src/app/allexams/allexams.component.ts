import { AllExamsService } from './allexams.service';
import { AllExamsModel } from './allexams.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-allexams',
  templateUrl: './allexams.component.html',
  styleUrls: ['./allexams.component.scss']
})
export class AllexamsComponent implements OnInit {

  displayedColumns: string[] = ['nomeTeste', 'complexity', 'tecnology', 'qtdQuestions', 'delete', 'edit'];
  dataSource = new MatTableDataSource<AllExamsModel>();

  constructor(private allExamsService: AllExamsService) { }


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.loadtable();
  }

  loadtable() {
    let array = []
    let item = new AllExamsModel()
    this.allExamsService.getAllExams()
      .subscribe(response => {
        response.forEach(element => {
          item = new AllExamsModel()
          item.nomeTeste = element.nomeTeste
          for (let index = 0; index < element.list.length; index++) {
            let exam = element.list[index];
            item.complexity += exam.complexidade
            item.tecnology += exam.tecnologia
            item.qtdQuestions += exam.quantidadeQuestoes

          }

          array.push(item)
        });
        this.dataSource.data = array
        this.dataSource.paginator = this.paginator;

      }, error => { console.log(error) }
      );
  }

}
