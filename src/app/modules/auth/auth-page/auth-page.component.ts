import { Component, EventEmitter, inject, input, Input, OnInit, Output } from '@angular/core';
import { SignInComponent } from '../signin/signin.component';
import { SignUpComponent } from '../signup/signup.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [
    SignInComponent,
    SignUpComponent
  ],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.scss'
})
export class AuthPageComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute);
  activeAuthComponent: string | null = 'signin';

  ngOnInit(): void {
    let authSession = this.activatedRoute.snapshot.params['authSession'];
    console.log(authSession);
    if (authSession === 'signup') {
      this.activeAuthComponent = 'signup';
    }

  }


  activateSignIn(): void {
    this.activeAuthComponent = 'signin';
  }

  activateSignUp(): void {
    this.activeAuthComponent = 'signup';
  }



}
