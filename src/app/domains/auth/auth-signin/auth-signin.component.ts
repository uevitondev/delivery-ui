import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ErrorHandlerService } from '../../../core/services/error-handler.service';
import { StorageService } from '../../../core/services/storage.service';
import { LoadingComponent } from '../../../modules/shared/loading/loading.component';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth-signin',
  imports: [RouterLink, ReactiveFormsModule, LoadingComponent],
  templateUrl: './auth-signin.component.html',
  styleUrl: './auth-signin.component.scss',
})
export class AuthSignInComponent implements OnInit {
  router = inject(Router);
  authService = inject(AuthService);
  storageService = inject(StorageService);
  errorHandlerService = inject(ErrorHandlerService);
  signinForm!: FormGroup;
  isLoading: boolean = false;
  message!: string;

  ngOnInit(): void {
    this.onInitSignInForm();
  }

  onInitSignInForm() {
    this.signinForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(16),
      ]),
    });
  }

  get email() {
    return this.signinForm.get('email');
  }

  get password() {
    return this.signinForm.get('password');
  }

  onSubmit() {
    this.isLoading = true;
    if (this.signinForm.invalid) {
      this.isLoading = false;
      return;
    }

    this.authService
      .signin({
        username: this.email?.value,
        password: this.password?.value,
      })
      .subscribe({
        next: (reponse) => {
          this.authService.setAuth(reponse);
          this.isLoading = false;
          reponse.roles.forEach((role) => {
            if (role == 'ROLE_CUSTOMER') {
              this.router.navigate(['/home']);
            } else if (role == 'ROLE_SELLER') {
              this.router.navigate(['seller']);
            }
          });
        },
        error: (e) => {
          if (e.status == 401) {
            this.message = e.error.detail;
          }
          this.errorHandlerService.handleError(e);
          this.isLoading = false;
        },
      });
  }
}
