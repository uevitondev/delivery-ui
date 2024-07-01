import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthRequest } from '../../../core/models/auth-request';
import { AuthService } from '../../../core/services/auth.service';
import { StorageService } from '../../../core/services/storage.service';
import { InputFormComponent } from '../../../shared/components/input-form/input-form.component';
import { AuthLayoutComponent } from '../auth-layout/auth-layout.component';


@Component({
  selector: 'app-signin-page',
  standalone: true,
  imports: [
    AuthLayoutComponent,
    InputFormComponent,
    ReactiveFormsModule
  ],
  templateUrl: './signin-page.component.html',
  styleUrl: './signin-page.component.scss'
})
export class SignInPageComponent {

  authService = inject(AuthService);
  storageService = inject(StorageService);
  router = inject(Router);
  toast = inject(ToastrService);
  signinForm!: FormGroup;

  constructor() {
    this.signinForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)])
    });
  }

  submit() {
    const authRequest: AuthRequest = this.signinForm.value;
    this.authService.signin(authRequest).subscribe({
      next: autResponse => {
        this.authService.setAuth(autResponse);
        this.toast.success('Login bem sucedido!');
        this.router.navigate(['home']);
      },
      error: e => {
        if (e.status == 401) {
          this.toast.error('Falha no login - Email ou Senha Inválidos!');
        } else {
          this.toast.error('Erro inesperado - Não foi possivel prosseguir com sua solicitação!');
        }
      }
    });
  }

  goTestApiComponent() {
    this.router.navigate(["testapi"]);
  }

  navigate() {
    this.router.navigate(["signup"]);
  }

}
