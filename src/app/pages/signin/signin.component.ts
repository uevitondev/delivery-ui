import { Component } from '@angular/core';
import { SigninLayoutComponent } from '../../components/signin-layout/signin-layout.component';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    SigninLayoutComponent
  ],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {

}
