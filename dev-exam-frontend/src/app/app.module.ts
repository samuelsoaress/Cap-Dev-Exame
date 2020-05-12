import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { QuestionsComponent } from './questions/questions.component';
import { FormsModule } from '@angular/forms';
import { SuccessComponent } from './success/success.component';
import { ManagerComponent } from './manager/manager.component';
import { ExamsComponent } from './exams/exams.component';
import { LoginComponent } from './login/login.component';
import { 
  AuthGuardService as AuthGuard 
} from './auth-guard.service';
import { RootComponent } from './root/root.component';
import { AuthService } from 'src/app/core/auth/auth.service';
import { LayoutComponent } from './layout/layout.component';


const appRoutes: Routes = [
  { path: 'login', component : LoginComponent},
  { path: 'exam', component: QuestionsComponent },
  { path: 'success', component: SuccessComponent },
  { path: 'manager', component: ManagerComponent, canActivate : [AuthGuard]},
  { path: 'newexams', component: ExamsComponent},
  {
    path: '',
    redirectTo: '/exam?code=d59792e19ef574ce662c13f2c6c78de4',
    pathMatch: 'full'
  },
  { path: '**', component: QuestionsComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    QuestionsComponent,
    SuccessComponent,
    ManagerComponent,
    ExamsComponent,
    LoginComponent,
    RootComponent,
    LayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
