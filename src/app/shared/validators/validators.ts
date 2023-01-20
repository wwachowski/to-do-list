import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function matchingValuesValidator(controlToCompare: AbstractControl | null | undefined):
    ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        return control && controlToCompare && control.value === controlToCompare.value
            ? null : { matchedPasswords: true };
    }
}