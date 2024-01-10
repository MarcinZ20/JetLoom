import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

@Directive({
  selector: '[appDateValidation]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS, 
      useExisting: DateValidationDirective, 
      multi: true}]
})
export class DateValidationDirective implements Validator {

  @Input('appDateValidation') date: Date;

  validate(control: AbstractControl): ValidationErrors | null {
    return this.date 
    ? dateValidation(this.date)(control)
    : null;
  }
}

export function dateValidation(date: Date): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = new Date(date) > new Date(control.value);
    return forbidden ? {forbiddenDate: {value: control.value}} : null;
  }
}
