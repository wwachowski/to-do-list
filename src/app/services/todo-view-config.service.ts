import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TodoViewConfig } from '../data/models/todoViewConfig';

@Injectable({
  providedIn: 'root'
})
export class TodoViewConfigService {
  private bSubject = new BehaviorSubject<TodoViewConfig>({});
  public config$ = this.bSubject.asObservable();

  constructor() {
    this.setInitialConfig();
  }

  public setConfig(todoViewConfig: TodoViewConfig): void {
    this.bSubject.next(todoViewConfig);
  }

  private setInitialConfig(): void {
    this.bSubject.next({
      date: new Date(),
      period: 'week',
      showDone: false,
      sortOpt: 'asc',
      filterSectionsIDs: []
    })
  }
}
