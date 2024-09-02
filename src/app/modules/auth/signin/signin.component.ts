import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthRequest } from '../../../core/models/signin-request';
import { AuthService } from '../../../core/services/auth.service';
import { RouterService } from '../../../core/services/router.service';
import { StorageService } from '../../../core/services/storage.service';
import { InputFormComponent } from '../../../shared/components/input-form/input-form.component';


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

  constructor(private fb: FormBuilder) {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }


  get email() {
    return this.signinForm.get('email');
  }

  get password() {
    return this.signinForm.get('password');
  }


  onSubmit() {
    if (this.signinForm.invalid) {
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
          this.toast.error('email ou senha inválidos ou conta desativada - tente novamente');
        } else {
          this.toast.error('Erro inesperado - Não foi possivel prosseguir com sua solicitação!');
        }
      }
    });
  }

}
