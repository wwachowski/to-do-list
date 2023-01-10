import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { TodosWeekComponent } from 'src/app/components/todos-week/todos-week.component';
import { TodoCardComponent } from 'src/app/components/todo-card/todo-card.component';
import { MaterialModule } from 'src/app/materials/material/material.module';

@NgModule({
  declarations: [
    HomeComponent,
    TodosWeekComponent,
    TodoCardComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule
  ]
})
export class HomeModule { }
