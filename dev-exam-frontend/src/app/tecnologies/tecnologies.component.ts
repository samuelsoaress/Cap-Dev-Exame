import { Component, OnInit } from '@angular/core';
import { tecnology } from './tecnology';

const ELEMENT_DATA: tecnology[] = [
  {name: 'Cobol'},
  {name: 'Java'},
  {name: 'Angular'},
  {name: 'Assembler'},
];

@Component({
  selector: 'app-tecnologies',
  templateUrl: './tecnologies.component.html',
  styleUrls: ['./tecnologies.component.scss']
})

export class TecnologiesComponent {
  displayedColumns: string[] = ['name','editar','excluir'];
  dataSource = ELEMENT_DATA;

 
  ngOnInit() {
  }
 
  
  
  /**
   * @title Basic use of `<table mat-table>`
   */

}

