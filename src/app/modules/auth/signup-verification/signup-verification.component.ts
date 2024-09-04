import { Component, inject, Input, input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputFormComponent } from '../../../shared/components/input-form/input-form.component';
import { ActivatedRoute } from '@angular/router';
import { RouterService } from '../../../core/services/router.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-signup-confirmation',
  standalone: true,
  imports: [
    InputFormComponent,
    ReactiveFormsModule,
    InputFormComponent
  ],
  templateUrl: './signup-verification.component.html',
  styleUrl: './signup-verification.component.scss'
})
export class SignupVerificationComponent implements OnInit {

  activatedRoute = inject(ActivatedRoute);
  routerService = inject(RouterService);
  toastService = inject(ToastrService);
  authService = inject(AuthService);
  signupVerificationForm!: FormGroup;
  email: string = '';


  ngOnInit(): void {
    let email = this.activatedRoute.snapshot.params['email'];
    this.email = email;
    this.signupVerificationForm = new FormGroup({
      token: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)])
    });

  }

  
  get token() {
    return this.signupVerificationForm.get('token');
  }

  newVerificationToken() { }

  validateToken() {
    if (this.signupVerificationForm.invalid) {
      return;
    }

    this.authService.signupVerificationToken({
      token: this.signupVerificationForm.controls['token'].value
    }).subscribe({
      next: data => {
        this.toastService.success('conta ativada com sucesso');
        this.routerService.toSignIn();
      },
      error: e => {
        this.toastService.error('token invalido');
        return;
      }
    });

  }

}
