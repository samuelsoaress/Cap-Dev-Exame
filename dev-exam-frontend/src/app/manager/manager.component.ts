import { QuestionsService } from 'src/app/services/questions.service';
import { Component, OnInit } from '@angular/core';
import { preserveWhitespacesDefault } from '@angular/compiler';
import { ManagerService } from './manager.service';
import { Candidate } from './manager.model'
import { FormControl, FormGroup, FormBuilder } from '@angular/forms'

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss'],
  preserveWhitespaces: true
})
export class ManagerComponent implements OnInit {

  nomeProva: any;
  manager: any;
  formCandidate: FormGroup;
  now = new Date()
  day: number
  month: number
  year: number
  hour: number
  minute: number

  constructor(private managerService: ManagerService,
    private service: QuestionsService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.day = this.now.getDate() + 3
    this.month = this.now.getMonth() + 1
    this.year = this.now.getFullYear()
    this.hour = this.now.getHours()
    this.minute = this.now.getMinutes()

    console.log(this.day + "/" + this.month + "/" + this.year)
    this.managerService.responsibleAll()
      .subscribe(manager => {
        console.log(manager)
        this.manager = manager
      })
    this.createForm(new Candidate);

    this.managerService.examPart()
      .subscribe(nomeProva => {
        console.log(nomeProva)
        this.nomeProva = nomeProva
      });
  }
  createForm(candidate: Candidate) {
    this.formCandidate = this.formBuilder.group({
      nome: [candidate.nome],
      email: [candidate.email],
      nomeTeste: [candidate.nomeTeste],
      emailGestor: [candidate.emailGestor],
      tempoRestante: [candidate.tempoRestante]
    })
  }

  onSubmit() {
    console.log(JSON.stringify(this.formCandidate.value))
    this.managerService.autorizator(JSON.stringify(this.formCandidate.value))
    this.formCandidate.reset(new Candidate());
  }

}
