import { Component, OnInit } from '@angular/core';
import { Technology } from '../models/technology';
import {TechnologyService} from '../services/technology.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-technologies',
  templateUrl: './technologies.component.html',
  styleUrls: ['./technologies.component.scss']
})

export class TechnologiesComponent {
  displayedColumns: string[] = ['name','editar','excluir'];
  dataSource: Observable<Technology[]>;
  edit: boolean = false
  technology: Technology;

  constructor(private technologiesService: TechnologyService, private router: Router){
    
  }
 
  ngOnInit() {
    this.dataSource = this.technologiesService.getTechnologies();
    this.technology = new Technology();
  }
 
  
  openEditor(){
    this.edit = true;
  }

  onSubmit() {
    this.technologiesService.updateTechnology(this.technology).subscribe(tec => console.log(tec.tecnologia));
    this.router.navigate(['technologies']);
  }

  editTechnology(codigo: any){
    this.technology.codigo = codigo;
    this.dataSource.subscribe(tech => {
      this.technology.tecnologia = tech.filter(t => t.codigo == codigo)[0].tecnologia
    });
    this.openEditor();
    
  }
  /**
   * @title Basic use of `<table mat-table>`
   */

}

