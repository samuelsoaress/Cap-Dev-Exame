import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuSuperiorComponent } from 'src/app/menu-superior/menu-superior.component';



@NgModule({
  exports: [MenuSuperiorComponent,
    RouterModule],
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class MenuSuperiorModule { }
