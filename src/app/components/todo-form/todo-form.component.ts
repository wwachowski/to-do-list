import { Component, Inject } from '@angular/core';
import { Todo } from 'src/app/data/models/todo';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent {
  public todoForm: FormGroup = this._createTodoForm();
  public submitted: boolean = false;

  constructor(
    private _dialogRef: MatDialogRef<TodoFormComponent>,
    @Inject(MAT_DIALOG_DATA) public todo: Todo) { }

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
    const date = this.todo?.date || new Date();
    const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
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
    const todoForm = new FormGroup({
      title: new FormControl('', {
        validators: [
          Validators.required
        ]
      }),
      desc: new FormControl('', {}),
      date: new FormControl(new Date(), {
        validators: [
          Validators.required
        ]
      }),
      time: new FormControl('', {
        validators: [
          Validators.required,
          Validators.pattern(/^(([0-9]{1})|([0-1]{1}[0-9]{1})|([2]{1}[0-3]{1}))(([:]{1})?)(([0-5]{1}[0-9]?)?)$/)
        ]
      }),
      section: new FormControl(null, {})
    });
    
    todoForm.patchValue({
      title: this.todo?.title,
      desc: this.todo?.desc,
      date: this.todo?.date || new Date(),
      time: this._getTime(),
      section: null
    })
    
    return todoForm;
  }
}
