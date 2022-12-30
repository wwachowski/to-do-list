import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const matchingPasswordsValidator: ValidatorFn = (control: AbstractControl):
    ValidationErrors | null => {
    const pass = control.get('password');
    const passRetype = control.get('passwordRetype');
    return pass && passRetype && pass.value === passRetype.value
        ? null : { matchedPasswords: true };
}