import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { ManagerService } from './manager.service'
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit {

  

  constructor(private managerService:ManagerService) { }

  ngOnInit() {
  }

  onSubmit(body:any){
    this.managerService.autorizator(JSON.stringfy(body))
  }

}
