import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ErrorHandlerService } from '../../../core/services/error-handler.service';
import { StorageService } from '../../../core/services/storage.service';
import { InputFormComponent } from '../../../shared/components/input-form/input-form.component';
import { LoadingComponent } from "../../../shared/components/loading/loading.component";
import { delay } from 'rxjs';


@Component({
    selector: 'app-auth-signin',
    imports: [
        RouterLink,
        RouterOutlet,
        InputFormComponent,
        ReactiveFormsModule,
        LoadingComponent
    ],
    templateUrl: './auth-signin.component.html',
    styleUrl: './auth-signin.component.scss'
})
export class AuthSignInComponent implements OnInit {

  router = inject(Router);
  authService = inject(AuthService);
  storageService = inject(StorageService);
  errorHandlerService = inject(ErrorHandlerService);
  signinForm!: FormGroup;
  isLoading: boolean = false;

  ngOnInit(): void {
    this.onInitSignInForm();
  }

  onInitSignInForm() {
    this.signinForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(16)])
    });
  }

  get email() {
    return this.signinForm.get('email');
  }

  get password() {
    return this.signinForm.get('password');
  }


  onSubmit() {
    this.isLoading = true;
    if (this.signinForm.invalid) {
      this.isLoading = false;
      return;
    }

    this.authService.signin({
      username: this.email?.value,
      password: this.password?.value,
    }).subscribe({
      next: (reponse) => {
        this.authService.setAuth(reponse);
        this.isLoading = false;
        this.router.navigate(['/home']);
      },
      error: e => {
        if (e.status == 401) {
          this.errorHandlerService.handleError(e, "OCORREU UM ERRO (EMAIL/SENHA INVALIDOS OU CONTA DESTATIVADA");
        } else {
          this.errorHandlerService.handleError(e, "OCORREU UM ERRO NA SOLICITAÇÃO DE LOGIN");
        }
        this.isLoading = false;
      }
    });
  }

}
