import { Component, Inject } from '@angular/core';
import { Todo } from 'src/app/data/models/todo';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent {

  public todoForm: FormGroup = this._createTodoForm();
  public submitted: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<TodoFormComponent>,
    @Inject(MAT_DIALOG_DATA) public todo: Todo
  ) { }

  public onSubmit(): void {
    this.submitted = true;
    if (this.todoForm.valid) {
      this._updateTodo();
      this._closeDialog(true);
    }
  }

  private _closeDialog(saveData?: boolean): void {
    this.dialogRef.close(saveData ? this.todo : null);
  }

  private _combineDateAndTime(date: Date, timeString: string): Date {
    return new Date(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${timeString}:00`)
  }

  private _getTime(): string {
    const date = this.todo.date;
    const hours = date.getHours();
    const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    return `${hours}:${minutes}`;
  }

  private _updateTodo(): void {
    const date = this.todoForm.get('date')?.value;
    const time = this.todoForm.get('time')?.value;
    this.todo.date = this._combineDateAndTime(date, time);
    this.todo.title = this.todoForm.get('title')!.value;
    this.todo.desc = this.todoForm.get('desc')?.value;
  }

  private _createTodoForm(): FormGroup {
    return new FormGroup({
      title: new FormControl(this.todo.title, {
        validators: [
          Validators.required
        ]
      }),
      desc: new FormControl(this.todo.desc, {
        validators: [
          Validators.maxLength(500)
        ]
      }),
      date: new FormControl(this.todo.date, {
        validators: [
          Validators.required
        ]
      }),
      time: new FormControl(this._getTime(), {
        validators: [
          Validators.required,
          Validators.pattern(/^(([0-9]{1})|([0-1]{1}[0-9]{1})|([2]{1}[0-3]{1}))(([:]{1})?)(([0-5]{1}[0-9]?)?)$/)
        ]
      }),
      section: new FormControl(this.todo.date, {
        validators: [
          Validators.required
        ]
      })
    });
  }
}
