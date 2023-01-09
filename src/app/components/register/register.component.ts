import { Component } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UniqueNameValidator } from 'src/app/shared/validators/async/unique-name-validator';
import { matchingPasswordsValidator } from 'src/app/shared/validators/validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  public userForm = this.createForm();

  constructor(private _uniqueNameValidator: UniqueNameValidator) { }

  public onSubmit() {
    if (this.userForm.valid) {
      //perform actual HTTP
    }
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
        ],
        updateOn: 'blur'
      }),
      passwords: new FormGroup({
        pswd: new FormControl('', {
          validators: [
            Validators.required,
            Validators.pattern(/^\S*$/)
          ],
          updateOn: 'blur'
        }),
        pswdRetype: new FormControl('', {
          validators: [
            Validators.required,
            matchingPasswordsValidator
          ],
          updateOn: 'blur'
        })
      })
    });
  }
}