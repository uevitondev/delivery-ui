import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';
import { ErrorHandlerService } from '../../services/error-handler.service';

@Component({
  selector: 'app-auth-verification',
  imports: [ReactiveFormsModule],
  templateUrl: './auth-verification.component.html',
  styleUrl: './auth-verification.component.scss',
})
export class AuthVerificationComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  toastService = inject(ToastrService);
  authService = inject(AuthService);
  errorHandlerService = inject(ErrorHandlerService);

  signupVerificationForm!: FormGroup;
  email: string = '';
  isLoading: boolean = false;

  ngOnInit(): void {
    let email = this.activatedRoute.snapshot.params['email'];
    this.email = email;
    this.onInitFormSignupVerification();
  }

  onInitFormSignupVerification() {
    this.signupVerificationForm = new FormGroup({
      token: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(6),
      ]),
    });
  }

  get token() {
    return this.signupVerificationForm.get('token');
  }

  validateToken() {
    if (this.signupVerificationForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService
      .verificationToken({
        token: this.signupVerificationForm.controls['token'].value,
      })
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          this.toastService.success('CONTA ATIVADA COM SUCESSO');
          this.router.navigate(['/auth/signin']);
        },
        error: (e) => {
          this.isLoading = false;
          this.errorHandlerService.handleError(e);
        },
      });
  }

  newVerificationToken() {
    this.isLoading = true;
    this.authService.verificationNewToken(this.email).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.toastService.success('NOVO TOKEN SOLICITADO');
      },
      error: (e) => {
        this.isLoading = false;
        this.errorHandlerService.handleError(e);
      },
    });
  }
}
