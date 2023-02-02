import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabChangeEvent } from '@angular/material/tabs';
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
  public todoViewConfig!: TodoViewConfig;
  private data$!: Observable<Array<Todo>>;
  private unsub$ = new Subject<void>();

  constructor(private _todos: TodosService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this._configInitialSetup();
    this._setTodos();
    this._sortTodos(this.todoViewConfig.sortOpt);
    // this._snackBar.open('Todo has been successfully edited!', 'Okay', { duration: 2000 });
  }

  ngOnDestroy(): void {
    this.unsub$.next();
    this.unsub$.complete();
  }

  private _configInitialSetup(): void {
    this.todoViewConfig = {
      date: new Date(),
      showDone: false,
      sortOpt: 'asc',
      period: 'week'
    };
  }

  private _sortTodos(sortOpt: 'asc' | 'desc'): void {
    this.todos.sort((a, b) => {
      if (a.done !== b.done) return +a.done;
      const timeDiff = a.date.getTime() - b.date.getTime();
      return sortOpt === 'asc' ? timeDiff : -timeDiff;
    })
    this.todos = [...this.todos];
  }

  private _setTodos(): void {
    const date = this.todoViewConfig.date;
    const period = this.todoViewConfig.period;
    this.data$ = (period === 'day')
      ? this._todos.getByDay(date) : this._todos.getByWeek(date);

    this.data$.pipe(
      takeUntil(this.unsub$),
      catchError(err => {
        console.error(err);
        return of([]);
      })
    ).subscribe(res => this.todos = res);
  }

  public onTabChange(event: MatTabChangeEvent): void {
    event.index === 0 ? this.todoViewConfig.period = 'week' : this.todoViewConfig.period = 'day';
    this._setTodos();
  }

  public updateConfig(config: TodoViewConfig): void {
    if (this.todoViewConfig.date !== config.date) {
      this._setTodos();
      this.todoViewConfig.date = config.date;
      return;
    }

    if (this.todoViewConfig.sortOpt !== config.sortOpt) {
      this.todoViewConfig.sortOpt = config.sortOpt;
      this._sortTodos(this.todoViewConfig.sortOpt);
      return;
    }

    this.todoViewConfig.showDone = config.showDone;
    this.todos = [...this.todos];
  }
}
