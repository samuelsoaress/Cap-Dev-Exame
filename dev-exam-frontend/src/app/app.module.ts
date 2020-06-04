import { UpdateQuestions } from './all-screen-questions/updateQuestions.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CandidateService } from './services/candidate.service';
import { ToastrModule } from 'ngx-toastr';
import { InterceptorService } from './core/auth/Interceptor.service';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { QuestionsComponent } from './questions/questions.component';
import { FormsModule, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SuccessComponent } from './success/success.component';
import { ManagerComponent } from './manager/manager.component';
import { ExamsComponent } from './exams/exams.component';
import { LoginComponent } from './login/login.component';
import {
  AuthGuardService as AuthGuard
} from './auth-guard.service';
import { RootComponent } from './root/root.component';
import { AuthService } from 'src/app/core/auth/auth.service';
import { MenuSuperiorComponent } from './menu-superior/menu-superior.component';
import { MenuLateralComponent } from './menu-lateral/menu-lateral.component';
import { TituloComponent } from './titulo/titulo.component';
import { RodapeComponent } from './rodape/rodape.component';
import { AllQuestionsComponent } from './all-questions/all-questions.component';
import { AllScreenQuestionsComponent } from './all-screen-questions/all-screen-questions.component';
import { TechnologiesComponent, ConfirmDeleteDialogComponent } from './technologies/technologies.component';
import { NewtechnologiesComponent } from './newtechnologies/newtechnologies.component';
import { MaterialModule } from 'src/app/material-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AllexamsComponent } from './allexams/allexams.component';
import { UpdateExam } from 'src/app/allexams/updateExam.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AllResultTestComponent } from './all-result-test/all-result-test.component';

@NgModule({
  declarations: [
    AppComponent,
    QuestionsComponent,
    SuccessComponent,
    ManagerComponent,
    ExamsComponent,
    LoginComponent,
    RootComponent,
    MenuSuperiorComponent,
    MenuLateralComponent,
    TituloComponent,
    RodapeComponent,
    AllQuestionsComponent,
    AllScreenQuestionsComponent,
    TechnologiesComponent,
    NewtechnologiesComponent,
    AllexamsComponent,
    UpdateExam,
    UpdateQuestions,
    AllResultTestComponent
  ],
  entryComponents: [UpdateExam, UpdateQuestions],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  exports: [
    ExamsComponent,
    QuestionsComponent
  ],
  providers: [CandidateService,{ provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
