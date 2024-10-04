import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Address } from '../../../core/models/address';
import { AuthService } from '../../../core/services/auth.service';
import { RouterService } from '../../../core/services/router.service';
import { AddressEditComponent } from '../../address/address-edit/address-edit.component';
import { AddressListComponent } from '../../address/address-list/address-list.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-user-account',
  standalone: true,
  imports: [
    MatIconModule,
    UserProfileComponent,
    AddressListComponent
  ],
  templateUrl: './user-account.component.html',
  styleUrl: './user-account.component.scss'
})
export class UserAccountComponent implements OnInit {

  dialog = inject(MatDialog);
  toastService = inject(ToastrService);
  routerService = inject(RouterService);
  authService = inject(AuthService);

  activeView: string = 'user-profile';
  isMenuOpen = false;

  ngOnInit(): void {
    if (!this.isAuthLoggedIn()) {
      this.toastService.show("NECESSÁRIO LOGIN!");
      this.routerService.toSignIn();
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  isAuthLoggedIn() {
    return this.authService.isLogged();
  }

  viewUserProfile(): void {
    this.activeView = 'user-profile';
  }

  viewUserAddresses(): void {
    this.activeView = 'user-addresses';
  }

  selectAddress(address: Address) {
    this.openAddressEditModal(address);
  }

  openAddressEditModal(address: any): void {
    this.dialog.open(AddressEditComponent, {
      width: 'auto',
      data: address
    });
  }


  logout() {
    this.authService.logout();
    this.routerService.toHome();
  }



}
