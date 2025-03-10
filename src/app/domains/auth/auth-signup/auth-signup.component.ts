import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorHandlerService } from '../../../core/services/error-handler.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth-signup',
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './auth-signup.component.html',
  styleUrl: './auth-signup.component.scss',
})
export class AuthSignUpComponent implements OnInit {
  router = inject(Router);
  authService = inject(AuthService);
  toastService = inject(ToastrService);
  errorHandlerService = inject(ErrorHandlerService);

  signupForm!: FormGroup;
  isLoading: boolean = false;

  ngOnInit(): void {
    this.onInitSignupForm();
  }

  onInitSignupForm() {
    this.signupForm = new FormGroup(
      {
        firstName: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(25),
        ]),
        lastName: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(60),
        ]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(16),
        ]),
        confirmPassword: new FormControl('', [Validators.required]),
      },
      this.confirmPasswordValidator('password', 'confirmPassword'),
    );
  }

  confirmPasswordValidator(
    password: string,
    confirmPassword: string,
  ): Validators {
    return (formGroup: AbstractControl): { [key: string]: any } | null => {
      const passwordControl = formGroup.get(password);
      const confirmPasswordControl = formGroup.get(confirmPassword);
      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }
      if (
        confirmPasswordControl.errors &&
        !confirmPasswordControl.errors['mismatch']
      ) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ mismatch: true });
        return { mismatch: true };
      } else {
        confirmPasswordControl.setErrors(null);
        return null;
      }
    };
  }

  onSubmit() {
    if (this.signupForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.signupForm.disable();

    this.authService
      .signup({
        firstName: this.firstName?.value,
        lastName: this.lastName?.value,
        email: this.email?.value,
        password: this.password?.value,
      })
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          this.router.navigate(['/auth/verification/', this.email?.value]);
        },
        error: (e) => {
          this.isLoading = false;
          this.signupForm.enable();
          this.errorHandlerService.handleError(e);
        },
      });
  }

  get firstName() {
    return this.signupForm.get('firstName');
  }

  get lastName() {
    return this.signupForm.get('lastName');
  }

  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }

  get confirmPassword() {
    return this.signupForm.get('confirmPassword');
  }
}
