import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'update-exam',
    templateUrl: './updateExam.html'
})
export class UpdateExam implements OnInit{ 
    nome:string
    tecnology:any
    complexity: string
    
    constructor(
        public dialogRef: MatDialogRef<UpdateExam>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        console.log('data', this.data);
      }

      
    ngOnInit(){
        this.nome = this.data.nomeTeste
        this.tecnology = this.data.tecnology
        this.complexity = this.data.complexity
    }


    
}