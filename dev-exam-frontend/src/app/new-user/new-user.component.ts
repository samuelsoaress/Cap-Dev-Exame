import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from './../users/users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  user: any
  _inputNome: HTMLInputElement;
  _inputAdmin: HTMLInputElement;

  constructor(private service: UsersService, private Router: Router, private ActivatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }
  onSubmit(value: any) {
    console.log(value)
    this.service.sendUser(JSON.stringify(value))
      .subscribe(
        res => {
          document.location.reload(true);
        }
      );
    document.location.reload(true);
  }

}
