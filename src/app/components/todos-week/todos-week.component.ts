import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Todo } from '../../data/models/todo';
import { MatDialog } from '@angular/material/dialog';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { Subject, catchError, of, takeUntil } from 'rxjs';

@Component({
  selector: 'app-todos-week',
  templateUrl: './todos-week.component.html',
  styleUrls: ['./todos-week.component.css']
})

export class TodosWeekComponent implements OnInit, OnDestroy {

  @Input() todoList: Todo[] | undefined;
  public wrappedTodoList: Todo[][] = [[], [], [], [], [], [], []];
  public weekDayNames: string[] = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ];
  private destroyer$ = new Subject<void>();

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this._wrapTodoList();
  }

  ngOnDestroy(): void {
    this.destroyer$.next();
    this.destroyer$.complete();
  }

  public displayDialog(data: Todo): void {
    this.dialog.open(TodoFormComponent, {
      data: data
    }).afterClosed().pipe(
      takeUntil(this.destroyer$),
      catchError(err => {
        console.error(err);
        return of(null);
      })).subscribe(data => {
        if (data) {
          // TODO: Update todo list by actual HTTP
          // also refresh data
        }
      })
  }

  private _wrapTodoList() {
    this.todoList?.forEach(todo => {
      const day: number = this._getWeekDayIndex(todo.date);
      this.wrappedTodoList[day].push(todo);
    });
  }

  private _getWeekDayIndex(date: Date): number {
    return date.getDay() - 1 >= 0 ? date.getDay() - 1 : 6;
  }
}
