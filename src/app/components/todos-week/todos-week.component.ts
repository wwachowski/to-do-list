import { Component, Input, OnInit } from '@angular/core';
import { Todo } from '../../data/models/todo'

@Component({
  selector: 'app-todos-week',
  templateUrl: './todos-week.component.html',
  styleUrls: ['./todos-week.component.css']
})

export class TodosWeekComponent implements OnInit {

  @Input() todoList: Todo[] | undefined;
  public wrappedTodoList: Todo[][] = [[], [], [], [], [], [], []];

  ngOnInit(): void {
    this._wrapTodoList();
  }

  private _wrapTodoList() {
    this.todoList?.forEach(todo => {
      const day: number = todo.date.getDay() - 1 >= 0 ? todo.date.getDay() - 1 : 6;
      this.wrappedTodoList[day].push(todo);
    });
  }
}
