import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AddressListComponent } from '../../components/address/address-list/address-list.component';
import { AuthAccountDataComponent } from '../../components/auth/auth-account-data/auth-account-data.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth-account-page',
  standalone: true,
  imports: [AuthAccountDataComponent, AddressListComponent],
  templateUrl: './auth-account-page.component.html',
  styleUrl: './auth-account-page.component.scss'
})
export class AuthAccountPageComponent implements OnInit {

  toastService = inject(ToastrService);
  router = inject(Router);
  authService = inject(AuthService);

  activeSection: string | null = null;

  ngOnInit(): void {
    if (!this.isAuthLoggedIn()) {
      this.toastService.show("NECESSÁRIO LOGIN!");
      this.router.navigate(["signin"]);
    }
  }

  isAuthLoggedIn() {
    return this.authService.isLogged();
  }

  activateSectionAuthAccountData(): void {
    this.activeSection = 'auth-account-data';
  }

  activateSectionAuthAddressList(): void {
    this.activeSection = 'auth-address-list';
  }

}
