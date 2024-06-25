import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserAccountDataDto } from '../../../model/user/user-accountdata';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-auth-account-data',
  standalone: true,
  imports: [],
  templateUrl: './auth-account-data.component.html',
  styleUrl: './auth-account-data.component.scss'
})
export class AuthAccountDataComponent implements OnInit {

  toastService = inject(ToastrService);
  router = inject(Router);
  authService = inject(AuthService);
  userService = inject(UserService);

  userAccountData: UserAccountDataDto | null = null;


  ngOnInit(): void {
    if (!this.isAuthLoggedIn()) {
      this.toastService.show("NECESSÁRIO LOGIN");
      this.router.navigate(["signin"]);
    }
    this.loadUserAccountData();
  }

  isAuthLoggedIn() {
    return this.authService.isLogged();
  }

  loadUserAccountData(): void {
    this.userService.getUserAccountData().subscribe({
      next: (userAccountData) => {
        this.userAccountData = userAccountData;
      },
      error: (e) => {
        this.toastService.error("Erro ao listar dados!");
      }
    });
  }

}
