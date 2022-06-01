import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { map, Observable, shareReplay, Subject, take, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { NotificationComponent } from 'src/app/shared/components/notification/notification.component';
import { TodoListComponent } from '../todo-list/todo-list.component';
import { TodoService } from '../../services/todo/todo.service';
import { TodoListItem } from '../todo-list/todo-list-item';
import { TodoForm } from '../todo-list/todo-form';

@Component({
  selector: 'gm-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoPageComponent implements OnInit {

  @ViewChild('listRef') listRef: TodoListComponent;

  private listSub: Subject<TodoListItem[]>;
  list$: Observable<TodoListItem[]>;
  private todoList: TodoListItem[];

  private selectedTodoSub: Subject<TodoListItem>;
  selectedTodo$: Observable<TodoListItem>;
  private selectedTodo: TodoListItem;

  showDrawer$: Observable<boolean>;

  constructor(
    private todoService: TodoService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.listSub = new Subject();
    this.list$ = this.listSub.asObservable().pipe(tap(data => {this.todoList = data}));

    this.selectedTodoSub = new Subject();
    this.selectedTodo$ = this.selectedTodoSub.asObservable()
      .pipe(
        shareReplay(1),
        tap(todo => {
          this.selectedTodo = todo;
          if (!todo && this.listRef?.list?.length > 0) {
            this.listRef.deselectAll();
          }
        })
      );

    this.showDrawer$ = this.selectedTodoSub.asObservable().pipe(map(todo => !!todo));

    this.todoService.getTodoSet()
      .pipe(take(1))
      .subscribe({
        next: data => this.listSub.next(data.map(item => new TodoListItem(item)))
      });
  }

  saveTodo(todo: TodoForm): void {
    if (this.selectedTodo?._id == null) {
      this.todoService.addTodo(todo).subscribe({
        next: item => {
          this.listSub.next([new TodoListItem(item), ...this.todoList.filter(item => item._id != null)]);
          this.selectedTodoSub.next(null);
          this._snackBar.openFromComponent(NotificationComponent, {
            data: 'Todo successfully added!',
            panelClass: 'gm-text-good',
            duration: 2500
          });
        },
        error: () => {
          this._snackBar.openFromComponent(NotificationComponent, {
            data: 'Can not add todo!',
            panelClass: 'gm-text-critical',
            duration: 2500
          });
        }
      });

    } else {
      this.todoService.editTodo({...todo, _id: this.selectedTodo._id}).subscribe({
        next: () => {
          this.listSub.next(this.todoList.map(item => {
            if (item._id === this.selectedTodo._id) {
              return {...item, ...new TodoListItem(todo)};
            }
            return item;
          }));

          this.selectedTodoSub.next(null);
          this._snackBar.openFromComponent(NotificationComponent, {
            data: 'Todo successfully updated!',
            panelClass: 'gm-text-good',
            duration: 2500
          });
        },
        error: () => {
          this._snackBar.openFromComponent(NotificationComponent, {
            data: 'Can not update todo!',
            panelClass: 'gm-text-critical',
            duration: 2500
          });
        }
      });
    }
  }

  deleteTodo(id: string): void {
    if (id == null) {
      this.selectedTodoSub.next(null);
      return;
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete TODO',
        message: 'Are you sure you want to delete TODO?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.todoService.deleteTodo(id)
          .pipe(take(1))
          .subscribe({
            next: () => {
              const deletedTodoIndex = this.todoList.findIndex(item => item._id === id);
              this.todoList.splice(deletedTodoIndex, 1);
              this.listSub.next([...this.todoList]);
              if (this.selectedTodo?._id === id) {
                this.selectedTodoSub.next(null);
              }
              this._snackBar.openFromComponent(NotificationComponent, {
                data: 'Todo successfully deleted!',
                panelClass: 'gm-text-good',
                duration: 2500
              });
            },
            error: () => {
              this._snackBar.openFromComponent(NotificationComponent, {
                data: 'Can not delete todo!',
                panelClass: 'gm-text-critical',
                duration: 2500
              });
            }
          });
      }
    });
  }

  addTodo(): void {
    this.selectedTodoSub.next(null);
    this.selectedTodoSub.next({title: null});
    if (this.listRef?.list?.length > 0) {
      this.listRef.deselectAll();
    }
  }

  selectTodo(todoId: string): void {
    this.selectedTodoSub.next(this.todoList.find(todo => todo._id === todoId));
  }

  cancelTodoEditing(): void {
    this.selectedTodoSub.next(null);
  }

}
