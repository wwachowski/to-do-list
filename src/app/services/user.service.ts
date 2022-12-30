import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  public doesUserExists(username: string): Observable<any> {
    return of(false);
  }
}
