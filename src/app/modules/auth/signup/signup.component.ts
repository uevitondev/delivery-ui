import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserSignUp } from '../../../core/models/user-signup';
import { AuthService } from '../../../core/services/auth.service';
import { RouterService } from '../../../core/services/router.service';
import { InputFormComponent } from '../../../shared/components/input-form/input-form.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    InputFormComponent,
    ReactiveFormsModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignUpComponent {
  routerService = inject(RouterService);
  toast = inject(ToastrService);
  authService = inject(AuthService);
  signupForm!: FormGroup;
  disabled = true;

  constructor() {
    this.signupForm = new FormGroup({
      fullName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)]),
      passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(4)])
    });
  }

  onSubmit() {
    if (this.signupForm.invalid) {
      return;
    }
    this.authService.signup({
      firstName: this.getFirstNameByFullName(this.signupForm.controls['fullName'].value),
      lastName: this.getLastNameByFullName(this.signupForm.controls['fullName'].value),
      email: this.signupForm.controls['email'].value,
      password: this.signupForm.controls['password'].value,
    }).subscribe({
      next: data => {
        this.toast.success('conta criada com sucesso');
        this.routerService.toSignIn();
      },
      error: e => {
        this.toast.error('erro ao criar conta');
        return;
      }
    });
  }

  getFirstNameByFullName(fullName: string): string {
    return fullName.split(' ')[0];
  }


  getLastNameByFullName(fullName: string) {
    let lastNames: string[] = fullName.split(' ');
    let finalLastNames: string[] = [];
    for (let i = 1; i < lastNames.length; i++) {
      finalLastNames.push(lastNames[i]);
    }
    return finalLastNames.join(' ');
  }

}
