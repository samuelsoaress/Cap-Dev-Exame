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

const appRoutes: Routes = [
  { path: 'exam', component: QuestionsComponent },
  { path: 'success', component: SuccessComponent },
  { path: 'manager', component: ManagerComponent},
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
    ExamsComponent
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
