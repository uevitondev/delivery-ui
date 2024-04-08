import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss'
})
export class AuthLayoutComponent {
  @Input() appTitleText: string = "";
  @Input() secondaryTitleText: string = "";
  @Input() primaryButtonText: string = ""; 
  @Input() secondaryButtonText: string = "";
  @Input() disableSubmitButton: boolean = true;
  
  @Output("submit") onSubmit = new EventEmitter();
  @Output("navigate") onNavigate = new EventEmitter();

  submit() {
    this.onSubmit.emit();
  }

  navigate() {
    this.onNavigate.emit();
  }

}
