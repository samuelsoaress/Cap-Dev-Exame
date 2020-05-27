import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as $ from 'jquery';
import 'metismenu';

@Component({
  selector: 'app-menuLateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.scss']
})
export class MenuLateralComponent implements OnInit, AfterViewInit {


  constructor() { }


  ngAfterViewInit(){
    
  }
  ngOnInit() {
    $("#metismenu").metisMenu();
  }

}
