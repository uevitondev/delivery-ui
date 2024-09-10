import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../core/services/auth.service';
import { RouterService } from '../../../core/services/router.service';
import { InputFormComponent } from '../../../shared/components/input-form/input-form.component';

@Component({
  selector: 'app-auth-signup',
  standalone: true,
  imports: [
    CommonModule,
    InputFormComponent,
    ReactiveFormsModule
  ],
  templateUrl: './auth-signup.component.html',
  styleUrl: './auth-signup.component.scss'
})
export class AuthSignUpComponent implements OnInit {
  routerService = inject(RouterService);
  authService = inject(AuthService);
  toastService = inject(ToastrService);

  signupForm!: FormGroup;
  isloading: boolean = false;

  ngOnInit(): void {
    this.initSignupForm();
  }


  initSignupForm() {
    this.signupForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(60)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]),
      confirmPassword: new FormControl('', [Validators.required]),
    }, this.confirmPasswordValidator('password', 'confirmPassword')
    );
  }

  confirmPasswordValidator(password: string, confirmPassword: string): Validators {
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
        return { mismatch: true }
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

    this.isloading = true;
    this.signupForm.disable();

    this.authService.signup({
      firstName: this.signupForm.controls['firstName'].value,
      lastName: this.signupForm.controls['lastName'].value,
      email: this.signupForm.controls['email'].value,
      password: this.signupForm.controls['password'].value,
    }).subscribe({
      next: data => {
        this.isloading = false;
        this.toastService.success('conta criada com sucesso');
        this.routerService.toSignUpVerification(this.signupForm.controls['email'].value);
      },
      error: e => {
        this.isloading = false;
        this.signupForm.enable();
        this.toastService.error('erro ao criar conta');
        return;
      }
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
