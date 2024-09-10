import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../core/services/auth.service';
import { RouterService } from '../../../core/services/router.service';
import { InputFormComponent } from '../../../shared/components/input-form/input-form.component';

@Component({
  selector: 'app-auth-resetpassword',
  standalone: true,
  imports: [
    InputFormComponent,
    ReactiveFormsModule,
    InputFormComponent
  ],
  templateUrl: './auth-resetpassword.component.html',
  styleUrl: './auth-resetpassword.component.scss'
})
export class AuthResetPasswordComponent implements OnInit {

  activatedRoute = inject(ActivatedRoute);
  routerService = inject(RouterService);
  toastService = inject(ToastrService);
  authService = inject(AuthService);
  emailForm!: FormGroup;
  passwordResetForm!: FormGroup;

  emailFormSubmited = false;
  passwordResetFormSubmited = false;
  isLoading = false;

  ngOnInit(): void {
    this.initEmailForm();
    this.initPasswordResetForm();
  }

  initEmailForm() {
    this.emailForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  initPasswordResetForm() {
    this.passwordResetForm = new FormGroup({     
      token: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]),
      confirmNewPassword: new FormControl('', [Validators.required]),
    }, this.confirmPasswordValidator('newPassword', 'confirmNewPassword')
    );
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


  resetPassword(){
    if(this.emailForm.invalid){
      return;
    }

    this.emailFormSubmited = true;
    this.emailForm.disable();
    this.isLoading = true;

    this.authService.resetPassword(this.email?.value).subscribe({
      next: data => {
        this.isLoading = false;
        this.toastService.success('Solicitção Enviada - Consulte seu email');
      },
      error: e => {
        this.emailForm.enable();
        this.isLoading = false;
        this.toastService.error('erro ao socilicar alteração da senha');
        return;
      }
    });


  }


  changePassword() {
    if (this.passwordResetForm.invalid) {
      return;
    }

    this.passwordResetForm.disable();
    this.passwordResetFormSubmited = true;
    this.isLoading = true;


    this.authService.changePassword({
      token: this.token?.value,
      newPassword: this.newPassword?.value
    }).subscribe({
      next: data => {
        this.isLoading = false
        this.toastService.success('Senha Alterada com sucesso!');
        this.routerService.toSignIn();
      },
      error: e => {
        this.isLoading = false;
        this.passwordResetForm.enable();
        this.toastService.error('Erro ao fazer alteração da senha!');
        return;
      }
    });

  }

}
