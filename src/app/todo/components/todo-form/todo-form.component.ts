import { Component, ChangeDetectionStrategy, EventEmitter, Output, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { TodoForm } from '../todo-list/todo-form';
import { Todo } from '../../interfaces/todo';

@Component({
  selector: 'gm-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoFormComponent implements OnInit, OnChanges {

  @Input() todo: Todo;
  @Output() save = new EventEmitter<TodoForm>();
  @Output() delete = new EventEmitter<string>();
  @Output() cancel = new EventEmitter();

  formGroup: FormGroup;

  readonly titleFormControlName = 'title';
  readonly endDateFormControlName = 'endDate';

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      [this.titleFormControlName]: new FormControl(this.todo?.title, [Validators.required]),
      [this.endDateFormControlName]: new FormControl(this.todo?.endDate),
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.todo && !changes.todo.firstChange) {
      this.formGroup.reset({
        [this.titleFormControlName]: this.todo?.title,
        [this.endDateFormControlName]: this.todo?.endDate
      });
    }
  }

  emitSaveData(): void {
    this.save.emit(this.formGroup.value);
  }

  emitDeleteData(): void {
    this.delete.emit(this.todo?._id);
  }

  emitCancelEvent(): void {
    this.cancel.emit();
  }

}
