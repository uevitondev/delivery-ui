import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { ErrorHandlerService } from '../../../core/services/error-handler.service';
import { AuthService } from '../../auth/auth.service';
import { UserProfile } from '../user-profile';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-profile',
  imports: [ReactiveFormsModule, MatDialogModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
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
        this.errorHandlerService.handleError(e);
      },
    });
  }
}
