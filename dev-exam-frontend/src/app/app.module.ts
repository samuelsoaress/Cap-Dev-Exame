import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

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
import { TecnologiesComponent } from './tecnologies/tecnologies.component';
import { NewtecnologiesComponent } from './newtecnologies/newtecnologies.component';
import { MaterialModule } from 'src/app/material-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AllexamsComponent } from './allexams/allexams.component';

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
    TecnologiesComponent,
    NewtecnologiesComponent,
    AllexamsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  exports:[
    ExamsComponent
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
