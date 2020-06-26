import {Component,Inject} from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'dialog-questions',
  templateUrl: 'dialog-questions.html',
})

export class DialogQuestions {
  nome:string;
  time:string;
  exam:string
  constructor(
    public dialogRef: MatDialogRef<DialogQuestions>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        console.log('data', this.data);
  }

  ngOnInit() {
    this.nome = this.data.nome
    this.time = this.data.time
    this.exam = this.data.exam
}
}
