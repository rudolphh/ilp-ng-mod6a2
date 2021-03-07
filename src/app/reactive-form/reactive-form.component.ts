import { ConfirmPasswordValidator } from './../_helpers/confirmpassword.validator';
import { User } from './user';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit {

  public registerForm !: FormGroup;
  public user : User = {};
  public submitted : boolean = false;

  constructor(private fb : FormBuilder) { }

  ngOnInit(): void {

    this.registerForm = this.fb.group({
      name: [this.user.name, Validators.required],
      email: [this.user.email, [
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')
      ]],
      address: [this.user.address, Validators.required],
      city: [this.user.city, Validators.required],
      phone: [this.user.phone, [
        Validators.required,
        Validators.pattern('[0-9]{3}-[0-9]{3}-[0-9]{4}'),
        Validators.minLength(12)
      ]],
      password: [this.user.password, [
        Validators.required,
        Validators.minLength(6)
      ]],
      confirmPassword: [this.user.confirmPassword, Validators.required],
    }, { validator : ConfirmPasswordValidator.MatchPassword });

  }

  onSubmit(){
    if (this.registerForm.valid) {
      console.log('form submitted');
      this.submitted = true;
    } else {
      // validate all form fields
      this.validateAllFormFields(this.registerForm);
    }
  }

  isRequiredFieldValid(field: string) {
    return this.registerForm.get(field)!.touched && this.registerForm.get(field)!.errors?.required;
  }

  isPatternFieldValid(field: string) {
    return this.registerForm.get(field)!.touched && this.registerForm.get(field)!.errors?.pattern;
  }

  isMinLengthFieldValid(field: string) {
    return this.registerForm.get(field)!.touched && this.registerForm.get(field)!.errors?.minlength;
  }

  isPasswordMatching(){
    return this.confirmPassword!.touched && this.confirmPassword!.errors?.ConfirmPassword;
  }

  displayFieldCss(field: string) {
    return {
      'is-invalid': this.registerForm.get(field)!.invalid && this.registerForm.get(field)!.touched
    };
  }

  validateAllFormFields(formGroup: FormGroup) {         //{1}
    Object.keys(formGroup.controls).forEach(field => {  //{2}
      const control = formGroup.get(field);             //{3}
      if (control instanceof FormControl) {             //{4}
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {        //{5}
        this.validateAllFormFields(control);            //{6}
      }
    });
  }

  get name() { return this.registerForm.get('name'); }
  get email() { return this.registerForm.get('email'); }
  get address() { return this.registerForm.get('address'); }
  get city() { return this.registerForm.get('city'); }
  get phone() { return this.registerForm.get('phone'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }


}
