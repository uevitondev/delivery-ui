import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthRequest } from '../../../core/models/signin-request';
import { AuthService } from '../../../core/services/auth.service';
import { RouterService } from '../../../core/services/router.service';
import { StorageService } from '../../../core/services/storage.service';
import { InputFormComponent } from '../../../shared/components/input-form/input-form.component';


@Component({
  selector: 'app-auth-signin',
  standalone: true,
  imports: [
    InputFormComponent,
    ReactiveFormsModule
  ],
  templateUrl: './auth-signin.component.html',
  styleUrl: './auth-signin.component.scss'
})
export class AuthSignInComponent implements OnInit {
  routerService = inject(RouterService);
  authService = inject(AuthService);
  storageService = inject(StorageService);
  toastService = inject(ToastrService);

  signinForm!: FormGroup;

  ngOnInit(): void {
    this.initSignInForm();
  }

  initSignInForm() {
    this.signinForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(16)])
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
    this.authService.signin({
      username: this.signinForm.controls['email'].value,
      password: this.signinForm.controls['password'].value,
    }).subscribe({
      next: autResponse => {
        this.authService.setAuth(autResponse);
        this.toastService.success('Login bem sucedido!');
        this.routerService.toHome();
      },
      error: e => {
        if (e.status == 401) {
          this.toastService.error('erro - email ou senha inválidos/conta desativada');
        } else {
          this.toastService.error('erro - login falhou');
        }
      }
    });
  }

}
