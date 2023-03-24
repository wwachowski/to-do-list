import { Component, OnDestroy } from '@angular/core';
import { Subject, catchError, filter, of, takeUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';

import { TodoFormComponent } from 'src/app/components/todo-form/todo-form.component';
import { TodoViewConfig } from 'src/app/data/models/todoViewConfig';
import { TodoViewConfigService } from 'src/app/services/todo-view-config.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {
  public todoViewConfig!: TodoViewConfig;
  private _unsub$ = new Subject<void>();

  constructor(
    private _todoViewConfig: TodoViewConfigService,
    private _dialog: MatDialog,
    private _notification: NotificationService) {
    this._todoViewConfig.config$
      .pipe(takeUntil(this._unsub$))
      .subscribe(newConfig => {
        this.todoViewConfig = newConfig;
      });
  }

  ngOnDestroy(): void {
    this._unsub$.next();
    this._unsub$.complete();
  }

  public onTabChange(event: MatTabChangeEvent): void {
    this.todoViewConfig.period = event.index === 0 ? 'week' : 'day';
    this._todoViewConfig.setConfig(this.todoViewConfig);
  }

  public displayDialog(): void {
    this._dialog.open(TodoFormComponent, {
      data: {}
    }).afterClosed().pipe(
      filter(todo => !!todo),
      takeUntil(this._unsub$),
      catchError(err => {
        this._notification.notify('Something went wrong');
        console.error(err);
        return of(null);
      }))
      .subscribe(data => {
        // this._addTodoList(data);
        this._notification.notify('Successfully added');
      })
  }
}
