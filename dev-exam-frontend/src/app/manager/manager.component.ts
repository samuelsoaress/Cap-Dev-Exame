import { QuestionsService } from 'src/app/services/questions.service';
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { preserveWhitespacesDefault } from '@angular/compiler';
import { ManagerService } from './manager.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss'],
  preserveWhitespaces: true
})
export class ManagerComponent implements OnInit {

  nomeProva: any;
  manager: any;
   

  constructor(private managerService:ManagerService, private service: QuestionsService) { }

  ngOnInit() {
    this.managerService.responsibleAll()
    .subscribe(manager =>{
      console.log(manager)
      this.manager = manager
    })

    this.managerService.examPart()
    .subscribe(nomeProva => {
      console.log(nomeProva)
      this.nomeProva = nomeProva
    });
  }

  onSubmit(body:any){
    console.log(JSON.stringify(body))
    this.managerService.autorizator(JSON.stringify(body))
  }

}
