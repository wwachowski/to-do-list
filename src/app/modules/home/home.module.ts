import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { MaterialModule } from 'src/app/materials/material/material.module';
import { HomeComponent } from './home.component';
import { TodosWeekComponent } from 'src/app/components/todos-week/todos-week.component';
import { TodoCardComponent } from 'src/app/components/todo-card/todo-card.component';
import { ConfigBarComponent } from 'src/app/components/config-bar/config-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomeComponent,
    TodosWeekComponent,
    TodoCardComponent,
    ConfigBarComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
