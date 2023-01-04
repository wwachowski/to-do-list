import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const matchingPasswordsValidator: ValidatorFn = (control: AbstractControl):
    ValidationErrors | null => {
    const pswd = control.get('pswd');
    const pswdRetype = control.get('pswdRetype');
    return pswd && pswdRetype && pswd.value === pswdRetype.value ? null : { matchedPasswords: true };
}