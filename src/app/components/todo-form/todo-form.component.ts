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
    private _dialogRef: MatDialogRef<TodoFormComponent>,
    @Inject(MAT_DIALOG_DATA) public todo: Todo
  ) { }

  public onSubmit(): void {
    this.submitted = true;
    if (this.todoForm.invalid) return;
    this._updateTodo();
    this._dialogRef.close(this.todo);
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
    const formDate = this.todoForm.get('date')?.value;
    const formTime = this.todoForm.get('time')?.value;
    this.todo.date = this._combineDateAndTime(formDate, formTime);
    const { time, date, ...newTodo } = this.todoForm.value;
    this.todo = { ...this.todo, ...newTodo };
  }

  private _createTodoForm(): FormGroup {
    return new FormGroup({
      title: new FormControl(this.todo.title, {
        validators: [
          Validators.required
        ]
      }),
      desc: new FormControl(this.todo.desc, {}),
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
      section: new FormControl(this.todo.section, {
        validators: [
          Validators.required
        ]
      })
    });
  }
}
