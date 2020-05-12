import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menuSuperior',
  templateUrl: './menu-superior.component.html',
  styleUrls: ['./menu-superior.component.scss']
})
export class MenuSuperiorComponent implements OnInit {

  constructor( private http: HttpClient) { }

  ngOnInit() {
  }

}
