import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
import { Observable, catchError, map, of } from "rxjs";
import { UserService } from "src/app/services/user.service";

@Injectable({ providedIn: 'root' })

export class UniqueNameValidator implements AsyncValidator {

    constructor(private _userService: UserService) { }

    public validate(control: AbstractControl): Observable<ValidationErrors | null> {
        return this._userService.doesUserExists(control.value).pipe(
            map((isTaken: boolean) => isTaken ? { uniqueName: true } : null),
            catchError(() => of(null))
        );
    }
}