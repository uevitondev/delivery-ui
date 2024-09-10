import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthResetPasswordComponent } from '../auth-resetpassword/auth-resetpassword.component';
import { AuthSignInComponent } from '../auth-signin/auth-signin.component';
import { AuthSignUpComponent } from '../auth-signup/auth-signup.component';
import { AuthVerificationComponent } from '../auth-verification/auth-verification.component';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [
    AuthSignInComponent,
    AuthResetPasswordComponent,
    AuthSignUpComponent,
    AuthVerificationComponent
  ],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.scss'
})
export class AuthPageComponent implements OnInit {

  route = inject(Router);
  activatedAuthComponent: string | null = 'signin';

  ngOnInit(): void {
    this.redirectForAuthComponentByRouteUrl(this.route.url);
  }

  redirectForAuthComponentByRouteUrl(url: string) {
    if (url.includes('auth/signup')) {
      this.activatedAuthComponent = 'auth-signup'
    } else if (url.includes('auth/verification')) {
      this.activatedAuthComponent = 'auth-verification'
    } else if (url.includes('auth/reset-password')) {
      this.activatedAuthComponent = 'auth-reset-password'
    } else {
      this.activatedAuthComponent = 'auth-signin'
    }

  }


}