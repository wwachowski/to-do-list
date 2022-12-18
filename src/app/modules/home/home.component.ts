import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Todo } from 'src/app/data/models/todo';
import { TodosService } from 'src/app/services/todos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public displayMode!: string;
  public todos: Todo[] | undefined;

  constructor(private _todos: TodosService) { }

  ngOnInit(): void {
    this.displayTodosByDate(new Date(), 'week');
  }

  displayTodosByDate(date: Date, period: 'week' | 'day') {
    let data: Observable<Todo[] | undefined> = of([]);
    if (period === 'week') {
      data = this._todos.getByWeek(date);
      this.displayMode = 'week';
    }
    if (period === 'day') {
      data = this._todos.getByDay(date);
      this.displayMode = 'day';
    }
    data.subscribe({
      error: (err) => {
        console.log(err);
      },
      next: (res) => {
        this.todos = res ? res : [];
      }
    })
  }
}
