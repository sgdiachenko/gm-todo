import format from 'date-fns/format';

import { Todo } from "../../interfaces/todo";

export class TodoListItem {
  title: string;
  endDate?: Date;
  endDateDisplayValue?: string;
  _id?: string;

  constructor(todo: Todo) {

    this.title = todo.title;
    this._id = todo._id;

    const endDate = todo.endDate && new Date(todo.endDate);
    if (endDate && endDate.toString() !== 'Invalid Date') {
      this.endDate = endDate;
      this.endDateDisplayValue = format(this.endDate, 'MMM,d Y HH:mm');
    }
  }
}
