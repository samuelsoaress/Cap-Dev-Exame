import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { QuestionsComponent } from './questions/questions.component';
import { FormsModule } from '@angular/forms';
import { SuccessComponent } from './success/success.component';

const appRoutes: Routes = [
  { path: 'questions', component: QuestionsComponent },
  { path: 'success', component: SuccessComponent },
  {
    path: '',
    redirectTo: '/questions',
    pathMatch: 'full'
  },
  { path: '**', component: QuestionsComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    QuestionsComponent,
    SuccessComponent
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
