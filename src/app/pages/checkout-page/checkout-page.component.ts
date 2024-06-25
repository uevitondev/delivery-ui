import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AddressDto } from '../../model/address/address';
import { AddressService } from '../../services/address.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [],
  templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.scss'
})
export class CheckoutPageComponent implements OnInit {
  router = inject(Router);
  toastService = inject(ToastrService);
  authService = inject(AuthService);
  addressService = inject(AddressService);
  addresses!: AddressDto[];

  ngOnInit(): void {
    if (!this.isAuthLoggedIn()) {
      this.toastService.show("NECESSÁRIO LOGIN PARA REALIZAR CHECKOUT");
      this.router.navigate(["signin"]);
    }
  }

  isAuthLoggedIn() {
    return this.authService.isLogged();
  }

  getUserAddresses() {
    this.addressService.getUserAddresses().subscribe({
      next: (addresses) => {
        this.addresses = addresses;
      },
      error: (e) => {
        this.toastService.error("Erro ao listar enderços!");
      }
    });
  }

  setUserAdressToCart(address: any) {

  }


  cancel() { }
  confirm() { }

}
