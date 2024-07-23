import { Component, EventEmitter, inject, input, Input, OnInit, Output } from '@angular/core';
import { SignInComponent } from '../signin/signin.component';
import { SignUpComponent } from '../signup/signup.component';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';

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
  activatedAuthComponent: string | null = 'signin';

  ngOnInit(): void {
    this.activatedRoute.url.subscribe(urlSegments => {
      urlSegments.forEach(urlSegment => {
        if(urlSegment.path === 'signup'){
          this.activatedAuthComponent = 'signup'
        } else{
          this.activatedAuthComponent = 'signin'
        }
      })     
    }) ;

  }

  getActivatedAuthComponentEvent(event: string){
    if(event === 'signup'){
      this.activatedAuthComponent = 'signup';
    }else{
      this.activatedAuthComponent = 'signin';
    }
  }

}