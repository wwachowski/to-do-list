import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Todo } from '../data/models/todo';
import { TODOS } from '../data/mocks/todo.mocks';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor() { }

  public getByWeek(date: Date): Observable<Todo[]> {
    return of(TODOS);
  }

  public getByDay(date: Date): Observable<Todo[]> {
    return of(TODOS);
  }

  public add(todo: Todo): void {
    TODOS.push(todo);
  }

  public delete(todoId: number): void {
    TODOS.filter(todo => todo.id !== todoId);
  }
}
