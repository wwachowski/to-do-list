import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TodoViewConfig } from '../data/models/todoViewConfig';

@Injectable({
  providedIn: 'root'
})
export class TodoViewConfigService {
  private _viewConfigSubject = new BehaviorSubject<TodoViewConfig>({});
  public config$ = this._viewConfigSubject.asObservable();

  constructor() {
    this._viewConfigSubject.next({
      date: new Date(),
      period: 'week',
      showDone: false,
      sortOpt: 'asc',
      filterSectionsIDs: []
    })
  }

  public setConfig(todoViewConfig: TodoViewConfig): void {
    this._viewConfigSubject.next(todoViewConfig);
  }
}
