import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AllResultTestService } from './all-result-teste.service';
import { AllResultModel } from './all-result-teste.model';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-all-result-test',
  templateUrl: './all-result-test.component.html',
  styleUrls: ['./all-result-test.component.scss']
})
export class AllResultTestComponent implements OnInit {

  fileName= 'Excel.xlsx';

  constructor(private TestService: AllResultTestService) { }

  list = []
  item = new AllResultModel()

  displayedColumns: string[] = ['nomeTeste', 'nomeCandidato', 'pencentualAcerto', 'dataHora', 'delete'];
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


    this.TestService.GetAllResultTeste()
      .subscribe(response => {
        response.forEach(element => {
          this.item = new AllResultModel()
          this.item.nomeCandidato = element.nomeCandidato
          this.item.nomeTeste = element.nomeTeste
          this.item.pencentualAcerto = element.pencentualAcerto

          this.item.dataHora = element.dataHora

          this.list.push(this.item)
        });
        this.dataSource.data = this.list
        this.dataSource.paginator = this.paginator;

      }, error => { console.log(error) }
      );
  }

  exportexcel(): void {
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);

  }


}
