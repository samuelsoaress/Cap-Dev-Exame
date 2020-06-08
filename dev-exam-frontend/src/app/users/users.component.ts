import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { UsersService } from './users.service';
import { MatTableDataSource } from '@angular/material/table';
import { UsersModel } from './users.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import { UpdateUsers } from './updateusers.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  fileName = 'Excel.xlsx';

  constructor(private service: UsersService, public dialog: MatDialog) { }

  list = []
  item = new UsersModel()

  displayedColumns: string[] = ['nome', 'admin', 'delete','edit'];
  dataSource = new MatTableDataSource<UsersModel>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.loadtable();
  }

  loadtable() {


    this.service.GetAllUsers()
      .subscribe(response => {
        response.forEach(element => {
          this.item = new UsersModel()
          this.item.code = element.code
          this.item.nome = element.nome
          this.item.admin = element.admin


          this.list.push(this.item)
        });
        this.dataSource.data = this.list
        this.dataSource.paginator = this.paginator;

      }, error => { console.log(error) }
      );
  }

  update(model: UsersModel) {
    const dialogRef = this.dialog.open(UpdateUsers, {
      data: model
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
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
