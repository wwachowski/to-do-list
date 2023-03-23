import { Component, OnDestroy } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';

import { Subject, takeUntil } from 'rxjs';

import { TodoViewConfig } from 'src/app/data/models/todoViewConfig';
import { TodoViewConfigService } from 'src/app/services/todo-view-config.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {
  public todoViewConfig!: TodoViewConfig;
  private _unsub$ = new Subject<void>();

  constructor(private _todoViewConfig: TodoViewConfigService) {
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
}
