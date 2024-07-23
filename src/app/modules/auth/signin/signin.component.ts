import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthRequest } from '../../../core/models/auth-request';
import { AuthService } from '../../../core/services/auth.service';
import { StorageService } from '../../../core/services/storage.service';
import { InputFormComponent } from '../../../shared/components/input-form/input-form.component';
import { RouterService } from '../../../core/services/router.service';


@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    InputFormComponent,
    ReactiveFormsModule
  ],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SignInComponent {  
  routerService = inject(RouterService);
  authService = inject(AuthService);
  storageService = inject(StorageService);
  toast = inject(ToastrService);
  signinForm!: FormGroup;

  constructor() {
    this.signinForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)])
    });
  }

  onSubmit() {
    if(this.signinForm.invalid){
      return;
    }

    const authRequest: AuthRequest = this.signinForm.value;
    this.authService.signin(authRequest).subscribe({
      next: autResponse => {
        this.authService.setAuth(autResponse);
        this.toast.success('Login bem sucedido!');
        this.routerService.toHome();
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

}
