import { Component, EventEmitter, Input, Output, input } from '@angular/core';

@Component({
  selector: 'app-signin-layout',
  standalone: true,
  imports: [],
  templateUrl: './signin-layout.component.html',
  styleUrl: './signin-layout.component.scss'
})
export class SigninLayoutComponent {

  @Output("submit") onSubmit = new EventEmitter();
  @Output("navigate") onNavigate = new EventEmitter();

  submit() {
    this.onSubmit.emit();
  }

  navigate() {
    this.onNavigate.emit();
  }

}
