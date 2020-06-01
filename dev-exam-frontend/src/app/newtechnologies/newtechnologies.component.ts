import { Component, OnInit } from '@angular/core';
import { TechnologyService } from '../services/technology.service';
import { Technology } from '../models/technology';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-newtechnologies',
  templateUrl: './newtechnologies.component.html',
  styleUrls: ['./newtechnologies.component.scss']
})
export class NewtechnologiesComponent implements OnInit {

  technology: Technology;
  constructor(private service: TechnologyService, private router: Router) { }

  ngOnInit() {
    this.technology = new Technology();
  }
  onSubmit() {
    console.log(this.technology)
    
    this.service.createTechnology(this.technology)
    .subscribe(
      res => {
        this.router.navigate(['technologies']);
      }
    );
  }
}
