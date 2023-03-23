import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Section } from '../data/models/section';
import { SECTIONS } from '../data/mocks/section.mocks';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  public doesExist(username: string): Observable<boolean> {
    return of(false);
  }

  public getSections(): Observable<Array<Section>> {
    return of(SECTIONS);
  }

  public addSection(section: Section): Observable<boolean> {
    return of(true);
  }

  public updateSection(section: Section): Observable<boolean> {
    return of(true);
  }
}