import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router'
import { QuestionsService } from 'src/app/services/questions.service'

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.scss']
})
export class ExamsComponent implements OnInit {
  questions: any
  technologys = new Set();
  complexity = new Set();
  
  constructor(private questionsService: QuestionsService, private router: Router, private route: ActivatedRoute) {
  }

     id = 0

        RemoveLinhaTabela(item) {
                var tr = (item).closest('tr');
                tr.fadeOut(400, function() {
                tr.remove();  
                });
                return false;
        }
        addLine(){
            var novaLinha = ("<tr>");
            var itemCelula = "";
            var testName = ('#testName');
            var technology = ('#technology');
            var complexity = ('#complexity');
            var testAmount = ('#testAmount');
            itemCelula += '<td><input readonly name="testName[]" style="border:none;" value="'+testName+'"></td>';
            itemCelula += '<td><input name="technology[]" readonly style="border:none;" value="'+technology+'"></td>';
            itemCelula += '<td><input name="complexity[]" readonly style="border:none;" value="'+complexity+'"></td>';
            itemCelula += '<td><input name="testAmount[]" readonly style="border:none;" value="'+testAmount+'"></td>';
            itemCelula += '<td class="text-center">';
            itemCelula += '<button type="button" onclick="RemoveLinhaTabela(this)" class="btn-danger btn btn-xs">';
            itemCelula += '<i class="fa fa-lg fa-close"></i>';
            itemCelula += '</button>';
            itemCelula += '</td>';
            novaLinha.append(itemCelula);
            ("#tabela-pedido").append(novaLinha);
            return false;
            }




  ngOnInit() {
    this.questionsService.questions()
      .subscribe(questions => {
        console.log(questions)

        
        
        this.questions = questions
        for (let question of questions) {
          this.technologys.add(question.technology)
          this.complexity.add(question.complexity)
        }
        

      });
  }

}
