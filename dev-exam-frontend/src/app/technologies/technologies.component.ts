import { Component, OnInit } from '@angular/core';
import { technology } from './technology';
import {TechnologyService} from '../services/technology.service';

@Component({
  selector: 'app-tecnologies',
  templateUrl: './tecnologies.component.html',
  styleUrls: ['./tecnologies.component.scss']
})

export class TechnologiesComponent {
  displayedColumns: string[] = ['name','editar','excluir'];
  dataSource;

  constructor(private technologiesService: TechnologyService){
    this.dataSource = technologiesService.getTechnologies();
  }
 
  ngOnInit() {
  }
 
  
  
  /**
   * @title Basic use of `<table mat-table>`
   */

}

