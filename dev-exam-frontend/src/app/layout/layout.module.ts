import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from 'src/app/layout/layout.component';



@NgModule({
  exports:[
    LayoutComponent
  ],
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class LayoutModule { }
