import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
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
  user = new UsersModel()

  displayedColumns: string[] = ['nome', 'admin', 'delete', 'edit'];
  dataSource = new MatTableDataSource<UsersModel>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.loadtable();
  }

  delete(UsersModel: UsersModel) {
    this.service.DeleteUser(UsersModel.code)
      .subscribe(response => {
        console.log("Usuário excluido.")
      }, error => { console.log(error) }
      );
    document.location.reload(true);
  }

  loadtable() {
    this.service.GetAllUsers()
      .subscribe(response => {
        response.forEach(element => {
          this.user = new UsersModel()
          this.user.code = element.codigo
          this.user.nome = element.nome
          this.user.admin = element.admin


          this.list.push(this.user)
        });
        this.dataSource.data = this.list
        this.dataSource.paginator = this.paginator;

      }, error => { console.log(error) }
      );
  }

  update(UsersModel: UsersModel) {
    let config = new MatDialogConfig();
    const dialogRef = this.dialog.open(UpdateUsers, {
      data: UsersModel
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      document.location.reload(true);
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
