import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { UserProfile } from '../../../core/models/user-profile';
import { AuthService } from '../../../core/services/auth.service';
import { ErrorHandlerService } from '../../../core/services/error-handler.service';
import { UserService } from '../../../core/services/user.service';
import { InputFormComponent } from '../../../shared/components/input-form/input-form.component';

@Component({
    selector: 'app-user-profile',
    imports: [
        ReactiveFormsModule,
        InputFormComponent,
        MatDialogModule
    ],
    templateUrl: './user-profile.component.html',
    styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {

  authService = inject(AuthService);
  userService = inject(UserService);
  errorHandlerService = inject(ErrorHandlerService);

  userProfileForm!: FormGroup;
  userProfile!: UserProfile;
  isLoading: boolean = false;

  ngOnInit(): void {
    this.initUserProfileForm();
    this.loadUserAccountProfile();
  }

  initUserProfileForm() {
    this.userProfileForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
      phoneNumber: new FormControl(''),
    });
  }


  loadUserAccountProfile(): void {
    this.userService.getUserProfile().subscribe({
      next: (userProfile) => {
        this.userProfile = userProfile;
        this.userProfileForm.patchValue(userProfile);
      },
      error: (e) => {
        this.errorHandlerService.handleError(e, "OCORREU UM ERRO AO CARREGAR DADOD DE PERFIL");
      }
    });
  }

}
