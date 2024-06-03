import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { AuthLayoutComponent } from '../../components/auth-layout/auth-layout.component';
import { InputFormComponent } from '../../components/input-form/input-form.component';
import { AuthRequest } from '../../model/auth/auth-request';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';

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
      next: data => {
        this.authService.userLoggedSuccess(data);
        this.toast.success('Login bem sucedido!');
        this.router.navigate(['home']);
      },
      error: e => {
        if(e.status == 401 ){
          this.toast.error('Falha no login - Email ou Senha Inválidos!');
        }else{
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
