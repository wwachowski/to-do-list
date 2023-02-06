import { Component } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public userForm: FormGroup = this._createForm();

  public onSubmit(): void {
    if (this.userForm.invalid) return;
    //perform actual HTTP
  }

  private _createForm(): FormGroup {
    return new FormGroup({
      name: new FormControl('', {
        validators: [
          Validators.required,
          Validators.pattern(/^\S*$/)
        ]
      }),
      pswd: new FormControl('', {
        validators: [
          Validators.required,
          Validators.pattern(/^\S*$/)
        ]
      })
    }, { updateOn: 'blur' });
  }
}
