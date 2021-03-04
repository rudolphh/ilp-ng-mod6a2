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
      email: [this.user.email],
      address: [this.user.address],
      city: [this.user.city],
      phone: [this.user.phone],
      password: [this.user.password],
      confirmPassword: [''],
    })
    /* can also create instances manually

    this.registerForm = new FormGroup({
      name: new FormControl(this.user.name, Validators.required), // or [Validators.required, etc]
      email: new FormControl(this.user.email),
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

}
