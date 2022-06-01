import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../../interfaces/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  static readonly URL = 'http://localhost:3000/api/todos'

  constructor(private http: HttpClient) { }

  getTodoSet(): Observable<Todo[]> {
    return this.http.get<Todo[]>(TodoService.URL);
  }

  addTodo(item: Todo): Observable<Todo> {
    return this.http.post<Todo>(TodoService.URL, item);
  }

  editTodo(item: Todo): Observable<Todo> {
    return this.http.put<Todo>(`${TodoService.URL}/${item._id}`, item);
  }

  deleteTodo(todoId: string): Observable<Todo> {
    return this.http.delete<Todo>(`${TodoService.URL}/${todoId}`);
  }

}
