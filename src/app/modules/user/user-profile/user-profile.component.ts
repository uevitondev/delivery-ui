import { Component, OnInit, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserProfile } from '../../../core/models/user-profile';
import { AuthService } from '../../../core/services/auth.service';
import { RouterService } from '../../../core/services/router.service';
import { UserService } from '../../../core/services/user.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { InputFormComponent } from '../../../shared/components/input-form/input-form.component';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputFormComponent,
    MatDialogModule
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {

  toastService = inject(ToastrService);
  routerService = inject(RouterService);
  authService = inject(AuthService);
  userService = inject(UserService);

  userProfile!: UserProfile;
  userProfileForm!: FormGroup;


  ngOnInit(): void {
    if (!this.authService.isLogged()) {
      this.toastService.show("NECESSÁRIO LOGIN");
      this.routerService.toSignIn();
    }

    this.userProfileForm = new FormGroup({
      fullName: new FormControl(''),
    });

    this.loadUserAccountProfile();
  }


  loadUserAccountProfile(): void {
    this.userService.getUserProfile().subscribe({
      next: (userProfile) => {
        this.userProfile = userProfile;
        this.userProfileForm.patchValue({
          fullName: this.userProfile.fullName
        })
      },
      error: (e) => {
        this.toastService.error("Erro ao listar dados!");
      }
    });
  }

}
