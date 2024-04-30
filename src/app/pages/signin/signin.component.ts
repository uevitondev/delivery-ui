import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthLayoutComponent } from '../../components/auth-layout/auth-layout.component';
import { InputFormComponent } from '../../components/input-form/input-form.component';
import { AuthService } from '../../services/auth.service';
import { UserSignIn } from '../../model/user-signin';
import { catchError, tap } from 'rxjs';
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
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)])
    });
  }

  submit() {
    const userSignIn: UserSignIn = {
      username: this.signinForm.controls['email'].value,
      password: this.signinForm.controls['password'].value,
    }

    this.authService.signin(userSignIn).subscribe({
      next: data => {
        this.storageService.save('authUser', data);
        console.log(data);
        this.toast.info('Login bem sucedido! Token Salvo!');
      },
      error: e => {
        console.log(e);
        this.toast.error('Erro ao efetuar login!');
      }
    });
  }

  teste() {
    this.authService.teste().subscribe({
      next: data => {
        console.log(data);
        this.toast.info('teste bem sucedido!');
      },
      error: e => {
        console.log(e);
        this.toast.error('Erro ao efetuar teste!');
      }
    });
  }

  navigate() {
    this.router.navigate(["signup"]);
  }

}
