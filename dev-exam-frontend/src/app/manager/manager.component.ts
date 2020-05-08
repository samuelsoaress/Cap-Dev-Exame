import { QuestionsService } from 'src/app/services/questions.service';
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { preserveWhitespacesDefault } from '@angular/compiler';
import { ManagerService } from './manager.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss'],
  preserveWhitespaces: true
})
export class ManagerComponent implements OnInit {

  tipoProva: any 

  constructor(private service: QuestionsService) { }

  ngOnInit() {
    this.service.listProva().subscribe(console.log);
  }
  

}
