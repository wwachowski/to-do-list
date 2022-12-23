import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, catchError, of, takeUntil } from 'rxjs';
import { Todo } from 'src/app/data/models/todo';
import { TodosService } from 'src/app/services/todos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  public displayMode!: string;
  public todos!: Todo[];
  private data$!: Observable<Todo[]>;
  private destroyer$ = new Subject<void>();

  constructor(private _todos: TodosService) { }

  ngOnInit(): void {
    this._setTodosByDate(new Date(), 'week');
  }

  ngOnDestroy(): void {
    this.destroyer$.next();
    this.destroyer$.complete();
  }

  private _setTodosByDate(date: Date, period: 'week' | 'day'): void {
    this.data$ = (period === 'week')
      ? this._todos.getByWeek(date) : this._todos.getByDay(date);
    this.displayMode = period;

    this.data$.pipe(
      takeUntil(this.destroyer$),
      catchError(err => {
        console.error(err);
        return of([]);
      })
    ).subscribe(res => this.todos = res);
  }
}
