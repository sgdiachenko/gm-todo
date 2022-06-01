import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoPageComponent } from './components/todo-page/todo-page.component';
import { HttpClientModule } from '@angular/common/http';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    TodoPageComponent,
    TodoListComponent,
    TodoFormComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    TodoPageComponent
  ]
})
export class TodoModule { }
