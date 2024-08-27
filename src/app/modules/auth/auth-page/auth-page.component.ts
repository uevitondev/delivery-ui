import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SignInComponent } from '../signin/signin.component';
import { SignupVerificationComponent } from '../signup-verification/signup-verification.component';
import { SignUpComponent } from '../signup/signup.component';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [
    SignInComponent,
    SignUpComponent,
    SignupVerificationComponent
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
    if (url.includes('auth/signup') && !url.includes('auth/signup/verification')) {
      this.activatedAuthComponent = 'signup'
    } else if (url.includes('auth/signup/verification')) {
      this.activatedAuthComponent = 'signup-verification'
    } else {
      this.activatedAuthComponent = 'signin'
    }

  }


}