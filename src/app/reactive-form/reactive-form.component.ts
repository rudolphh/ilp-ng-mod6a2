import { ConfirmPasswordValidator } from './../_helpers/confirmpassword.validator';
import { User } from './user';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit {

  registerForm !: FormGroup;

  user : User = {};

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

    /* can also create instances manually

    this.registerForm = new FormGroup({
      name: new FormControl(this.user.name, Validators.required),
      address: new FormControl(this.user.address),
      city: new FormControl(this.user.city),
      phone: new FormControl(this.user.phone),
      password: new FormControl(this.user.password),
      confirmPassword: new FormControl(),
    });

    */
  }

  onSubmit(){
    this.submitted = true;
  }

  get name() { return this.registerForm.get('name'); }
  get email() { return this.registerForm.get('email'); }
  get address() { return this.registerForm.get('address'); }
  get city() { return this.registerForm.get('city'); }
  get phone() { return this.registerForm.get('phone'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }


}
