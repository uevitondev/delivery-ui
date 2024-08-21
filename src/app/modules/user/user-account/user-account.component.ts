import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Address } from '../../../core/models/address';
import { AuthService } from '../../../core/services/auth.service';
import { AddressFormComponent } from '../../address/address-form/address-form.component';
import { AddressListComponent } from '../../address/address-list/address-list.component';
import { RouterService } from '../../../core/services/router.service';
import { UserProfileComponent } from '../user-profile/user-profile.component';

@Component({
  selector: 'app-user-account',
  standalone: true,
  imports: [
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

  ngOnInit(): void {
    if (!this.isAuthLoggedIn()) {
      this.toastService.show("NECESSÁRIO LOGIN!");
      this.routerService.toSignIn();
    }
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
    this.dialog.open(AddressFormComponent, {
      width: 'auto',
      data: address
    });
  }



}
