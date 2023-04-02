import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Subject, catchError, of, takeUntil } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Todo } from 'src/app/data/models/todo';
import { Section } from 'src/app/data/models/section';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit, OnDestroy {
  public todoForm: FormGroup = this._createTodoForm();
  public isSubmitted: boolean;
  public sections: Section[] = [];
  private _unsub$ = new Subject<void>();

  constructor(
    private _dialogRef: MatDialogRef<TodoFormComponent>,
    @Inject(MAT_DIALOG_DATA) public todo: Todo,
    private _user: UserService,
    private _datePipe: DatePipe) { }

  ngOnInit(): void {
    this._getSections();
  }

  ngOnDestroy(): void {
    this._unsub$.next();
    this._unsub$.complete();
  }

  public onSubmit(): void {
    this.isSubmitted = true;
    if (this.todoForm.invalid) return;
    this._updateTodo();
    this._dialogRef.close(this.todo);
  }

  private _getSections(): void {
    this._user.getSections().pipe(
      takeUntil(this._unsub$),
      catchError(err => {
        console.error(err);
        return of([]);
      })
    ).subscribe(sections => this.sections = sections);
  }

  private _combineDateAndTime(date: Date, timeString: string): Date {
    return new Date(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${timeString}:00`)
  }

  private _getTime(): string {
    return this._datePipe.transform(this.todo?.date || new Date(), 'hh:mm') || '00:00';
  }

  private _updateTodo(): void {
    const formDate = this.todoForm.get('date')?.value;
    const formTime = this.todoForm.get('time')?.value;
    const section = this.sections.find(section => section.id === this.todoForm.get('sectionId')?.value);
    this.todo.date = this._combineDateAndTime(formDate, formTime);
    this.todo.section = section;
    const { time, date, sectionId, ...newTodo } = this.todoForm.value;
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
      sectionId: new FormControl(-1, {
        validators: [
          Validators.required
        ]
      })
    });

    todoForm.patchValue({
      title: this.todo?.title,
      desc: this.todo?.desc,
      date: this.todo?.date || new Date(),
      time: this._getTime(),
      sectionId: this.todo?.section?.id
    })

    return todoForm;
  }
}
