import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ConfirmData,
    private _dialogRef: MatDialogRef<ConfirmDialogComponent>) { }

  public close(confirmed: boolean = false): void {
    this._dialogRef.close(confirmed);
  }
}

export type ConfirmData = {
  title: string,
  content: string,
  confirmText: string,
  cancelText: string
}