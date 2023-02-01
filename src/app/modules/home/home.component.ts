import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subject, catchError, of, takeUntil } from 'rxjs';
import { Todo } from 'src/app/data/models/todo';
import { TodoViewConfig } from 'src/app/data/models/todoViewConfig';
import { TodosService } from 'src/app/services/todos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  public todos!: Array<Todo>;
  public rangeDate: Date = new Date();
  private data$!: Observable<Array<Todo>>;
  private unsub$ = new Subject<void>();

  constructor(private _todos: TodosService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this._setTodosByDate(new Date(), 'week');
    // this._snackBar.open('Todo has been successfully edited!', 'Okay', { duration: 2000 });
  }

  ngOnDestroy(): void {
    this.unsub$.next();
    this.unsub$.complete();
  }

  private _setTodosByDate(date: Date, period: 'week' | 'day'): void {
    this.data$ = (period === 'week')
      ? this._todos.getByWeek(date) : this._todos.getByDay(date);

    this.data$.pipe(
      takeUntil(this.unsub$),
      catchError(err => {
        console.error(err);
        return of([]);
      })
    ).subscribe(res => this.todos = res);
  }

  public setConfig(config: TodoViewConfig): void {
    console.log(config);
    // TODO: Handle TodoViewConfig
  }
}
