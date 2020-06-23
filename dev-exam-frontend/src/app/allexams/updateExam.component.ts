import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import * as $ from 'jquery';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'update-exam',
    templateUrl: './updateExam.html'
})
export class UpdateExam implements OnInit {
    nome: string
    tecnology: any
    complexity: string
    exam: Array<any> = []
    exame: any
    newExam: Array<any> = [];
    _inputTechnology: HTMLInputElement;
    _inputQuantity: HTMLInputElement;
    _inputComplexity: HTMLInputElement;
    contLinha: number

    constructor(
        public dialogRef: MatDialogRef<UpdateExam>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        console.log('data', this.data);
    }

    addLine(arg1, arg2, arg3) {
        var newRow = $("<tr>");
        var cols = "";
        cols += '<td readonly>' + arg1 + '</td>';
        cols += '<td readonly>' + arg2 + '</td>';
        cols += '<td readonly >' + arg3 + '</td>';
        cols += '<td>';
        cols += '<button class="btn-danger btn btn-xs" onclick="onDelete(this)" type="button">Remover</button>';
        cols += '</td>';
        newRow.append(cols);
        $("#tabela-prova").append(newRow);
        this.newExam.push(this.exam)
        this.exam = []
    }

    add() {
        this._inputQuantity = <HTMLInputElement>document.querySelector('#testAmount');
        this._inputTechnology = <HTMLInputElement>document.querySelector('#technology');
        this._inputComplexity = <HTMLInputElement>document.querySelector('#complexity');
        this.exam.push(this._inputQuantity.value)
        this.exam.push(this._inputTechnology.value)
        this.exam.push(this._inputComplexity.value)
        this.addLine(this._inputTechnology.value, this._inputComplexity.value, this._inputQuantity.value)
    }


    ngOnInit() {
        this.nome = this.data.nomeTeste
        this.tecnology = this.data.tecnology
        this.complexity = this.data.complexity
    }



}