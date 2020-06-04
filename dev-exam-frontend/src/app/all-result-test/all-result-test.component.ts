import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AllResultTestService } from './all-result-teste.service';
import { AllResultModel } from './all-result-teste.model';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-all-result-test',
  templateUrl: './all-result-test.component.html',
  styleUrls: ['./all-result-test.component.scss']
})
export class AllResultTestComponent implements OnInit {


  constructor(private TestService: AllResultTestService) { }

  displayedColumns: string[] = ['nomeTeste', 'nomeCandidato', 'pencentualAcerto', 'dataHora', 'delete', 'edit'];
  dataSource = new MatTableDataSource<AllResultModel>();

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
    let item = new AllResultModel()

    this.TestService.GetAllResultTeste()
      .subscribe(response => {
        response.forEach(element => {
          item = new AllResultModel()
          item.nomeCandidato = element.nomeCandidato
          item.nomeTeste = element.nomeTeste
          item.pencentualAcerto = element.pencentualAcerto

          item.dataHora = element.dataHora

          list.push(item)
        });
        this.dataSource.data = list
        this.dataSource.paginator = this.paginator;

      }, error => { console.log(error) }
      );
  }

}
