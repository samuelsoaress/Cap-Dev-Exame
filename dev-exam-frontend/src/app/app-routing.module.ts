import { AllResultTestComponent } from './all-result-test/all-result-test.component';
import { AllScreenQuestionsComponent } from './all-screen-questions/all-screen-questions.component';
import { ExamsComponent } from './exams/exams.component';
import { AuthGuardService} from './auth-guard.service';
import { ManagerComponent } from './manager/manager.component';
import { SuccessComponent } from './success/success.component';
import { QuestionsComponent } from './questions/questions.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllQuestionsComponent } from './all-questions/all-questions.component';
import { TechnologiesComponent} from './technologies/technologies.component';
import { NewtechnologiesComponent} from './newtechnologies/newtechnologies.component';
import { AllexamsComponent } from 'src/app/allexams/allexams.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'exam', component: QuestionsComponent, canActivate: [AuthGuardService]},
  { path: 'success', component: SuccessComponent },
  { path: 'manager', component: ManagerComponent, canActivate: [AuthGuardService]},
  { path: 'newexams', component: ExamsComponent },
  { path: 'allexams', component: AllexamsComponent },
  { path: 'newquestion', component: AllQuestionsComponent },
  { path: 'allquestions', component: AllScreenQuestionsComponent },
  { path: 'technologies', component: TechnologiesComponent },
  { path: 'technologies/new', component: NewtechnologiesComponent },
  { path: 'allresulttest', component: AllResultTestComponent },


  { path: '**', component: QuestionsComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
