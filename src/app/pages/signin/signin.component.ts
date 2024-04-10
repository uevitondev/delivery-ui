import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthLayoutComponent } from '../../components/auth-layout/auth-layout.component';
import { InputFormComponent } from '../../components/input-form/input-form.component';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    AuthLayoutComponent,
    InputFormComponent,
    ReactiveFormsModule
  ],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {

  router = inject(Router);
  toast = inject(ToastrService);
  signinForm!: FormGroup;

  constructor() {
    this.signinForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)])
    });
  }

  submit() {
    console.log(this.signinForm.value);
    this.toast.success("Login Efetuado com sucesso!");
  }

  navigate() {
    this.router.navigate(["signup"]);
  }

}