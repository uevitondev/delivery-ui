import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AddressDto } from '../../../model/address/address';
import { AddressService } from '../../../services/address.service';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-address-list',
  standalone: true,
  imports: [],
  templateUrl: './address-list.component.html',
  styleUrl: './address-list.component.scss'
})
export class AddressListComponent implements OnInit {

  toastService = inject(ToastrService);
  router = inject(Router);
  addressService = inject(AddressService);
  authService = inject(AuthService);

  userAddresses: AddressDto[] | null = null;


  ngOnInit(): void {
    if (!this.isAuthLoggedIn()) {
      this.toastService.show("NECESSÁRIO LOGIN");
      this.router.navigate(["signin"]);
    }
    this.loadUserAddresses();
  }

  isAuthLoggedIn() {
    return this.authService.isLogged();
  }

  loadUserAddresses(): void {
    this.addressService.getUserAddresses().subscribe({
      next: (userAddresses) => {
        this.userAddresses = userAddresses;
      },
      error: (e) => {
        this.toastService.error("Erro ao listar endereços!");
      }
    });
  }

}
