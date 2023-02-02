import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Todo } from '../../data/models/todo';
import { MatDialog } from '@angular/material/dialog';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { Subject, catchError, filter, of, takeUntil } from 'rxjs';

@Component({
  selector: 'app-todos-week',
  templateUrl: './todos-week.component.html',
  styleUrls: ['./todos-week.component.css']
})

export class TodosWeekComponent implements OnInit, OnDestroy, OnChanges {

  @Input() todoList: Array<Todo> | undefined;
  @Input() showDoneTodos!: boolean;
  public wrappedTodoList!: Array<Array<Todo>>;
  public weekDayNames: Array<string> = [];
  private unsub$ = new Subject<void>();

  constructor(private dialog: MatDialog) { }

  ngOnChanges(): void {
    this.wrappedTodoList = [[], [], [], [], [], [], []];
    if (!this.showDoneTodos) this.todoList = this.todoList?.filter(todo => !todo.done);
    this._wrapTodoList();
  }

  ngOnInit(): void {
    this._setWeekDays();
  }

  ngOnDestroy(): void {
    this.unsub$.next();
    this.unsub$.complete();
  }

  public displayDialog(data: Todo): void {
    this.dialog.open(TodoFormComponent, {
      data: data
    }).afterClosed().pipe(
      filter(todo => !!todo),
      takeUntil(this.unsub$),
      catchError(err => {
        console.error(err);
        return of(null);
      }))
      .subscribe(data => {
        // TODO: Update todo list by actual HTTP
        // also refresh data
      })
  }

  private _setWeekDays(): void {
    const date = new Date('01/04/1970');
    for (let i = 0; i < 7; i++) {
      this.weekDayNames.push(this._getWeekDay(date, 1));
    }
  }

  private _getWeekDay(date: Date, offset?: number, lang?: string): string {
    return new Date(date.setDate(date.getDate() + (offset ?? 0)))
      .toLocaleString(lang ?? 'default', { weekday: 'short' });
  }

  private _wrapTodoList(): void {
    this.todoList?.forEach(todo => {
      const day: number = this._getWeekDayIndex(todo.date);
      this.wrappedTodoList[day].push(todo);
    });
  }

  private _getWeekDayIndex(date: Date): number {
    return date.getDay() - 1 >= 0 ? date.getDay() - 1 : 6;
  }
}
