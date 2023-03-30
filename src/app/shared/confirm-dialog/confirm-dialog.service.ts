import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { ConfirmData, ConfirmDialogComponent } from './confirm-dialog.component';

@Injectable()
export class ConfirmDialogService {
    constructor(private _dialog: MatDialog) { }

    public open$(data: ConfirmData): Observable<boolean> {
        return this._dialog.open(ConfirmDialogComponent, { data: data })
            .afterClosed();
    }
}