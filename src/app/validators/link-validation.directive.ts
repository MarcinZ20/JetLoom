import { Directive, Input } from '@angular/core';
import { AbstractControl, ValidationErrors, Validator, ValidatorFn, NG_VALIDATORS} from '@angular/forms';

// FIXME: Link validation directive does not work
export function linkValidator(linkRe: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const link = linkRe.test(control.value)
    return link ? {link: {value: control.value}} : null;
  }
} 

@Directive({
  selector: '[appLinkValidation]',
  providers: [
    {
      provide: NG_VALIDATORS, 
      useExisting: LinkValidationDirective, 
      multi: true
    },
  ],
  standalone: true,
})
export class LinkValidationDirective implements Validator {

  @Input('appLinkValidation') link: string;

  validate(control: AbstractControl): ValidationErrors | null {
    console.log('link validation directive');
    return this.link 
    ? linkValidator(new RegExp(this.link, 'i'))(control)
    : null;
  }
}
