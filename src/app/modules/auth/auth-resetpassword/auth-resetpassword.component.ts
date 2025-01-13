import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../core/services/auth.service';
import { ErrorHandlerService } from '../../../core/services/error-handler.service';

@Component({
  selector: 'app-auth-resetpassword',
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './auth-resetpassword.component.html',
  styleUrl: './auth-resetpassword.component.scss'
})
export class AuthResetPasswordComponent implements OnInit {

  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  authService = inject(AuthService);
  toastService = inject(ToastrService);
  errorHandlerService = inject(ErrorHandlerService);

  emailForm!: FormGroup;
  passwordResetForm!: FormGroup;
  resetPasswordSuccess = false;
  changePasswordSuccess = false;
  isLoading = false;

  ngOnInit(): void {
    this.onInitEmailForm();
    this.onInitPasswordResetForm();
  }

  onInitEmailForm() {
    this.emailForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  onInitPasswordResetForm() {
    this.passwordResetForm = new FormGroup({
      token: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]),
      confirmNewPassword: new FormControl('', [Validators.required]),
    }, this.confirmPasswordValidator('newPassword', 'confirmNewPassword')
    );
  }

  get email() {
    return this.emailForm.get('email');
  }

  get token() {
    return this.passwordResetForm.get('token');
  }

  get newPassword() {
    return this.passwordResetForm.get('newPassword');
  }

  get confirmNewPassword() {
    return this.passwordResetForm.get('confirmNewPassword');
  }

  confirmPasswordValidator(newPassword: string, confirmNewPassword: string): Validators {
    return (formGroup: AbstractControl): { [key: string]: any } | null => {
      const passwordControl = formGroup.get(newPassword);
      const confirmPasswordControl = formGroup.get(confirmNewPassword);
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




  resetPassword() {
    if (this.emailForm.invalid) {
      return;
    }

    this.emailForm.disable();
    this.isLoading = true;

    this.authService.resetPassword(this.email?.value).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.resetPasswordSuccess = true;
        this.toastService.success('TOKEN DE REDEFINIÇÃO ENVIADO - CONSULTE A CAIXA DE ENTRADA DO SEU EMAIL');
      },
      error: (e) => {
        this.emailForm.enable();
        this.isLoading = false;
        this.errorHandlerService.handleError(e, "OCORREU UM ERRO NA SOLICITAÇÃO DE RESET DA SENHA")
      }
    });
  }

  changePassword() {
    if (this.passwordResetForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.passwordResetForm.disable();


    this.authService.changePassword({
      token: this.token?.value,
      newPassword: this.newPassword?.value
    }).subscribe({
      next: (response) => {
        this.isLoading = false
        this.changePasswordSuccess = true;
        this.toastService.success('SUA SENHA FOI ALTERADA COM SUCESSO');
        this.router.navigate(['/auth/signin']);
      },
      error: (e) => {
        this.isLoading = false;
        this.passwordResetForm.enable();
        this.errorHandlerService.handleError(e, "OCORREU UM ERRO AO FAZER A ALTERAÇÃO DE SENHA");
      }
    });

  }

}
