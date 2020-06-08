import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { UsersService } from './users.service';
import { Component, Inject, OnInit } from '@angular/core';


@Component({
    selector: 'updateusers',
    templateUrl: './updateusers.html'
})
export class UpdateUsers implements OnInit {
    code: number
    nome: string
    admin: string

    constructor(public service: UsersService,
        public dialogRef: MatDialogRef<UpdateUsers>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        console.log('data', this.data);
    }

    ngOnInit() {
        this.code = this.data.code
        this.nome = this.data.nome
        this.admin = this.data.nome
    }
    // onSubmit(body: any) {
    //     body['codigo'] = this.code
    //     console.log(body)

    //     this.service.UpdateUser(body)
    //         .subscribe(res => {
    //             console.log("Usuario atualizado")
    //         }, error => { console.log(error) }
    //         );

    // }
}
