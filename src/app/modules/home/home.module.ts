import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomeRoutingModule } from './home-routing.module';
import { MaterialModule } from 'src/app/materials/material/material.module';
import { HomeComponent } from './home.component';
import { TodosWeekComponent } from 'src/app/components/todos-week/todos-week.component';
import { TodoCardComponent } from 'src/app/components/todo-card/todo-card.component';
import { TodoFormComponent } from 'src/app/components/todo-form/todo-form.component';
import { ConfigBarComponent } from 'src/app/components/config-bar/config-bar.component';
import { SectionsPickerComponent } from 'src/app/components/sections-picker/sections-picker.component';
import { SectionMenuComponent } from 'src/app/components/section-menu/section-menu.component';

@NgModule({
  declarations: [
    HomeComponent,
    TodosWeekComponent,
    TodoCardComponent,
    TodoFormComponent,
    ConfigBarComponent,
    SectionsPickerComponent,
    SectionMenuComponent
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
