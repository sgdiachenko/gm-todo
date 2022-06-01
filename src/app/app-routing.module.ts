import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TodoPageComponent } from './todo/components/todo-page/todo-page.component';
import { TodoModule } from './todo/todo.module';

const routes: Routes = [
  {
    path: '',
    component: TodoPageComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    TodoModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
