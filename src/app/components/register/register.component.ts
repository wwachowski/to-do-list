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
  public user = new FormGroup({
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
    password: new FormControl('', {
      validators: [
        Validators.required
      ],
      updateOn: 'blur'
    }),
    passwordRetype: new FormControl('', {
      validators: [
        Validators.required
      ],
      updateOn: 'blur'
    })
  }, { validators: matchingPasswordsValidator });

  constructor(private _uniqueNameValidator: UniqueNameValidator) { }

  public onSubmit() {
    if (this.user.valid) {
      //perform actual HTTP
    }
  }
}
