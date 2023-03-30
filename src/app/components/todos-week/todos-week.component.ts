import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, catchError, filter, of, takeUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { Todo } from '../../data/models/todo';
import { TodoViewConfig } from 'src/app/data/models/todoViewConfig';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { TodosService } from 'src/app/services/todos.service';
import { TodoViewConfigService } from 'src/app/services/todo-view-config.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ConfirmDialogService } from 'src/app/shared/confirm-dialog/confirm-dialog.service';

@Component({
  selector: 'app-todos-week',
  templateUrl: './todos-week.component.html',
  styleUrls: ['./todos-week.component.scss']
})
export class TodosWeekComponent implements OnInit, OnDestroy {
  public todoList: Array<Todo> | undefined;
  public todoViewConfig?: TodoViewConfig;
  public wrappedTodoList!: Array<Array<Todo>>;
  public weekDayNames: Array<string> = [];
  private _unsub$ = new Subject<void>();

  constructor(
    private _dialog: MatDialog,
    private _todos: TodosService,
    private _todoViewConfig: TodoViewConfigService,
    private _notification: NotificationService,
    private _confirmDialog: ConfirmDialogService) {
    this._todoViewConfig.config$
      .pipe(takeUntil(this._unsub$))
      .subscribe(newConfig => {
        this.todoViewConfig = newConfig;
        this._configureTodoList();
      });
  }

  ngOnInit(): void {
    this._configureTodoList();
  }

  ngOnDestroy(): void {
    this._unsub$.next();
    this._unsub$.complete();
  }

  public displayDialog(data: Todo): void {
    this._dialog.open(TodoFormComponent, {
      data: data
    }).afterClosed().pipe(
      filter(todo => !!todo),
      takeUntil(this._unsub$),
      catchError(err => {
        console.error(err);
        this._notification.notify('Something went wrong!');
        return of(null);
      }))
      .subscribe(data => {
        this._notification.notify('Successfully updated Todo!');
        this._updateTodoList(data);
      })
  }

  public onDelete(id: number): void {
    this._confirmDialog.open$({
      title: 'Delete todo',
      content: 'Are you sure you want to delete this todo?',
      confirmText: 'Yes, delete',
      cancelText: 'Cancel'
    }).pipe(
      takeUntil(this._unsub$),
      catchError(err => {
        console.error(err);
        return of(false);
      })).subscribe(res => {
        if (!res) return;
        this._deleteTodo(id);
      });
  }

  private _deleteTodo(id: number): void {
    this._todos.delete(id).pipe(
      takeUntil(this._unsub$),
      catchError(err => {
        console.error(err);
        return of(false);
      }))
      .subscribe(res => {
        if (!res) {
          this._notification.notify('Something went wrong');
          return;
        } this._notification.notify('Successfully deleted todo');
      })
  }

  private _updateTodoList(data: any) {
    // TODO: Update todo list by actual HTTP
    // also refresh data
  }

  private _configureTodoList(): void {
    this._getTodoList();
    this.wrappedTodoList = [[], [], [], [], [], [], []];
    this._filterTodoList();
    this._wrapTodoList();
    this._setWeekDays();
  }

  private _wrapTodoList(): void {
    this.todoList?.forEach(todo => {
      const day: number = this._getWeekDayIndex(todo.date);
      this.wrappedTodoList[day].push(todo);
    });
  }

  private _getTodoList(): void {
    const date = this.todoViewConfig?.date || new Date();
    this._todos.getByWeek(date).pipe(
      takeUntil(this._unsub$),
      catchError(err => {
        console.error(err);
        return of([]);
      })
    ).subscribe(newList => this.todoList = newList);
  }

  private _filterTodoList(): void {
    this.todoList = this._filterTodosBySections();
    if (!this.todoViewConfig?.showDone) this.todoList = this.todoList?.filter(todo => !todo.done);
    this._sortTodos(this.todoViewConfig?.sortOpt || 'asc');
  }

  private _filterTodosBySections(): Array<Todo> | undefined {
    if (!this.todoViewConfig?.filterSectionsIDs?.length || !this.todoList?.length) return this.todoList;
    return this.todoList.filter((todo) => (todo.section?.id !== undefined
      && this.todoViewConfig?.filterSectionsIDs!.includes(todo.section!.id!)));
  }

  private _sortTodos(sortOpt: 'asc' | 'desc'): void {
    this.todoList?.sort((a, b) => {
      if (a.done !== b.done) return +a.done;
      const timeDiff = a.date.getTime() - b.date.getTime();
      return sortOpt === 'asc' ? timeDiff : -timeDiff;
    });
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

  private _getWeekDayIndex(date: Date): number {
    return date.getDay() - 1 >= 0 ? date.getDay() - 1 : 6;
  }
}
