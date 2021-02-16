import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[passwordConfirm]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PasswordConfirmValidatorDirective,
      multi: true,
    },
  ],
})
export class PasswordConfirmValidatorDirective implements Validator {
  validate(control: AbstractControl): { [key: string]: any } | null {
    const password = control.get('password');
    const password_confirmation = control.get('password_confirmation');
    return password &&
      password_confirmation &&
      password_confirmation.value === password.value
      ? null
      : { passwordConfirmed: true };
  }
}
