import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private _snackBar: MatSnackBar) { }

  public notify(message: string, delay: number = 2000): void {
    this._snackBar.open(message, 'Okay', { duration: delay });
  }
}
