import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AddressDto } from '../../../core/models/address';
import { AuthService } from '../../../core/services/auth.service';
import { AddressFormComponent } from '../../address/components/address-form/address-form.component';
import { AddressListComponent } from '../../address/components/address-list/address-list.component';
import { AuthAccountDataComponent } from '../auth-account-data/auth-account-data.component';

@Component({
  selector: 'app-auth-account-page',
  standalone: true,
  imports: [
    AuthAccountDataComponent,
    AddressListComponent
  ],
  templateUrl: './auth-account-page.component.html',
  styleUrl: './auth-account-page.component.scss'
})
export class AuthAccountPageComponent implements OnInit {

  dialog = inject(MatDialog);
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

  getAddressSelectedEvent(address: AddressDto) {
    this.openAddressEditModal(address);
  }

  openAddressEditModal(address: any): void {
    const dialogRef = this.dialog.open(AddressFormComponent, {
      data: address,
      width: '50%'
    });
  }



}
