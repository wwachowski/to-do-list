import { Component, OnDestroy, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { UniqueNameValidator } from 'src/app/shared/validators/async/unique-name-validator';
import { matchingValuesValidator } from 'src/app/shared/validators/validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  public userForm!: FormGroup;
  private unsub$ = new Subject<void>();

  constructor(private _uniqueNameValidator: UniqueNameValidator) { }

  ngOnInit(): void {
    this.configureUserForm();
  }

  ngOnDestroy(): void {
    this.unsub$.next();
    this.unsub$.complete();
  }

  public onSubmit(): void {
    if (this.userForm.invalid) return;
    //perform actual HTTP
  }

  private configureUserForm(): void {
    this.userForm = this.createForm();

    this.userForm.get('passwords')?.get('pswdRetype')?.addValidators(
      matchingValuesValidator(this.userForm?.get('passwords')?.get('pswd'))
    );

    this.userForm.get('passwords')?.get('pswd')?.valueChanges.pipe(
      takeUntil(this.unsub$)
    ).subscribe(_ => {
      this.userForm.get('passwords')?.get('pswdRetype')?.updateValueAndValidity();
    });
  }

  private createForm(): FormGroup {
    return new FormGroup({
      name: new FormControl('', {
        validators: [
          Validators.required,
          Validators.pattern(/^\S*$/)
        ],
        asyncValidators: [
          this._uniqueNameValidator.validate.bind(this._uniqueNameValidator)
        ]
      }),
      passwords: new FormGroup({
        pswd: new FormControl('', {
          validators: [
            Validators.required,
            Validators.pattern(/^\S*$/)
          ]
        }),
        pswdRetype: new FormControl('', {
          validators: [
            Validators.required
          ]
        })
      })
    }, { updateOn: 'blur' });
  }
}