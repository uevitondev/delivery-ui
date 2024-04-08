import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InputFormComponent } from '../../components/input-form/input-form.component';
import { SigninLayoutComponent } from '../../components/signin-layout/signin-layout.component';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    SigninLayoutComponent,
    InputFormComponent,
    ReactiveFormsModule
  ],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {

  router = inject(Router);
  signinForm!: FormGroup;

  constructor() {
    this.signinForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)])
    });
  }

  submit() {
    console.log(this.signinForm.value);
  }

  navigate() {
    this.router.navigate(["/signup"]);
  }

}
