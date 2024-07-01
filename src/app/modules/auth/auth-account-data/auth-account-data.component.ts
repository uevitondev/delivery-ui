import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../core/services/auth.service';
import { UserService } from '../../../core/services/user.service';
import { UserAccountDataDto } from '../../../core/models/user-accountdata';

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
    this.loadAccountData();
  }

  isAuthLoggedIn() {
    return this.authService.isLogged();
  }

  loadAccountData(): void {
    this.userService.getAccountData().subscribe({
      next: (userAccountData) => {
        this.userAccountData = userAccountData;
      },
      error: (e) => {
        this.toastService.error("Erro ao listar dados!");
      }
    });
  }

}
