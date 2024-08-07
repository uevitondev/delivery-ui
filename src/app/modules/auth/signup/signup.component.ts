import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserSignUp } from '../../../core/models/user-signup';
import { AuthService } from '../../../core/services/auth.service';
import { InputFormComponent } from '../../../shared/components/input-form/input-form.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    InputFormComponent,
    ReactiveFormsModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignUpComponent {
  router = inject(Router);
  toast = inject(ToastrService);
  authService = inject(AuthService);
  signupForm!: FormGroup;
  disabled = true;

  constructor() {
    this.signupForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)]),
      passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(4)])
    });
  }

  submit() {
    const userSignUp: UserSignUp = {
      firstName: this.signupForm.controls['firstName'].value,
      lastName: this.signupForm.controls['lastName'].value,
      email: this.signupForm.controls['email'].value,
      password: this.signupForm.controls['password'].value,
    }

    this.authService.signup(userSignUp).subscribe({
      next: data => {
        console.log(data);
        this.toast.info('Conta Criada Com sucesso!');
      },
      error: e => {
        console.log(e);
        this.toast.error('Erro ao criar Conta!');
      }
    });
  }

  navigate() {
    this.router.navigate(["signin"]);
  }

}
