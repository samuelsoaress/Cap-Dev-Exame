import { Component, OnInit, Inject } from '@angular/core';
import { Technology } from '../models/technology';
import { TechnologyService } from '../services/technology.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-technologies',
  templateUrl: './technologies.component.html',
  styleUrls: ['./technologies.component.scss']
})

export class TechnologiesComponent {
  displayedColumns: string[] = ['name', 'editar', 'excluir'];
  dataSource: Observable<Technology[]>;
  edit: boolean = false
  technology: Technology;

  constructor(
    private technologiesService: TechnologyService,
    private router: Router,
    public dialog: MatDialog) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
  }

  ngOnInit() {
    this.dataSource = this.technologiesService.getTechnologies();
    this.technology = new Technology();
  }
  editTechnology(technology: Technology): void {
    const dialogRef = this.dialog.open(UpdateTechnologyDialog, {
      width: '300px',
      data: technology
    });
  }

  openConfirmDeleteDialog(tech: Technology): void {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '300px',
      data: tech
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.technologiesService.deleteTechnology(tech.codigo).subscribe(res => {
          this.router.navigated = false;
          this.router.navigate([this.router.url]);
        });
      }
    });
  }
}


@Component({
  selector: 'confirm-delete-dialog',
  templateUrl: 'confirm-delete.dialog.html',
})

export class ConfirmDeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Technology) { }
}


@Component({
  selector: 'update-technology-dialog',
  templateUrl: 'update-technology-dialog.html'
})

export class UpdateTechnologyDialog {
  constructor(
    public dialogRef: MatDialogRef<UpdateTechnologyDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Technology,
    private technologiesService: TechnologyService,
    private router: Router,
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
  }

  onCancelarClick() {
    this.dialogRef.close();
  }

  editTechnology(technology: Technology): void {
    if(technology.tecnologia){
      this.technologiesService.updateTechnology(technology).subscribe(() => {
        this.router.navigated = false;
        this.router.navigate([this.router.url]);
      });
    }
    this.dialogRef.close();
  }
}
