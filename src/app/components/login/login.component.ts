import { Component, createPlatform } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public userForm = this.createForm();

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
        updateOn: 'blur'
      }),
      pswd: new FormControl('', {
        validators: [
          Validators.required,
          Validators.pattern(/^\S*$/)
        ],
        updateOn: 'blur'
      })
    });
  }
}
