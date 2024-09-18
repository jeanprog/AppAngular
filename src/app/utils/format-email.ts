import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class EmailValidator {
  static emailValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    return emailRegex.test(control.value) ? null : { invalidEmail: true };
  };
}
