import { Component } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public user = new FormGroup({
    name: new FormControl('', {
      validators: [
        Validators.required
      ],
      updateOn: 'blur'
    }),
    password: new FormControl('', {
      validators: [
        Validators.required
      ],
      updateOn: 'blur'
    })
  });

  public onSubmit() {
    if (this.user.valid) {
      //perform actual HTTP
    }
  }
}
