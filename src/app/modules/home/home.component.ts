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
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  public todos!: Array<Todo>;
  public todoViewConfig!: TodoViewConfig;
  private data$?: Observable<Array<Todo>>;
  private unsub$ = new Subject<void>();

  constructor(private _todos: TodosService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this._configInitialSetup();
    this._setTodos();
  }

  ngOnDestroy(): void {
    this.unsub$.next();
    this.unsub$.complete();
  }

  public onTabChange(event: MatTabChangeEvent): void {
    event.index === 0 ? this.todoViewConfig.period = 'week' : this.todoViewConfig.period = 'day';
    this._setTodos();
  }

  public updateConfig(config: TodoViewConfig): void {
    this.todoViewConfig = {...this.todoViewConfig, ...config};
    this.todos = [...this.todos];
  }

  public notify(message: string): void {
    this._snackBar.open(message, 'Okay', { duration: 2000 });
  }

  private _configInitialSetup(): void {
    this.todoViewConfig = {
      date: new Date(),
      showDone: false,
      sortOpt: 'asc',
      period: 'week',
      filterSectionsIDs: []
    };
  }

  private _setTodos(): void {
    const date = this.todoViewConfig.date!;
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
}
