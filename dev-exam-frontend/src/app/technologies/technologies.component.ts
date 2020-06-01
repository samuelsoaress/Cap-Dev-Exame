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


  openEditor(): void {
    this.edit = true;
  }

  onSubmit(): void {
    this.technologiesService.updateTechnology(this.technology).subscribe(tec => {
      this.router.navigated = false;
      this.router.navigate([this.router.url]);
    });

    this.router.navigate(['technologies']);
  }

  editTechnology(tech: Technology): void {
    this.technology.codigo = tech.codigo;
    this.technology.tecnologia = tech.tecnologia
    this.openEditor();

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
