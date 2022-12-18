import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Todo } from '../data/models/todo';
import { TODOS } from '../data/mocks/todo.mocks';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor() { }

  getByWeek(date: Date): Observable<Todo[] | undefined> {
    return of(TODOS);
  }

  getByDay(date: Date): Observable<Todo[] | undefined> {
    return of(TODOS);
  }

  add(todo: Todo): void {
    TODOS.push(todo);
  }

  delete(todoId: number): void {
    TODOS.filter(todo => todo.id != todoId);
  }
}
