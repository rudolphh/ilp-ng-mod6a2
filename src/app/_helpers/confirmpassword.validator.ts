import { AbstractControl } from '@angular/forms';


export class ConfirmPasswordValidator {

  static MatchPassword(control: AbstractControl) {

    let password: AbstractControl = control.get('password')?.value;
    let confirmPassword: AbstractControl = control.get('confirmPassword')?.value;

    if(password != confirmPassword){
      control.get('confirmPassword')?.setErrors({ ConfirmPassword: true });
    }
    else {
      return null as any;
    }
  }
}
