import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatSelectionList, MatSelectionListChange } from '@angular/material/list/selection-list';

import { TodoListItem } from './todo-list-item';

@Component({
  selector: 'gm-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent {

  @Input() list: TodoListItem[];
  @Output() add = new EventEmitter();
  @Output() delete = new EventEmitter<string>();
  @Output() select = new EventEmitter<string>();

  @ViewChild('listRef') listRef: MatSelectionList;

  emitAddEvent(): void {
    this.add.emit();
  }

  emitDeleteData(event: PointerEvent, id: string): void {
    event.stopPropagation();
    this.delete.emit(id);
  }

  emitSelectData(selection: MatSelectionListChange): void {
    this.select.emit(selection.source._value[0]);
  }

  deselectAll(): void {
    this.listRef.deselectAll();
  }

}
