import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AddressDto } from '../../../core/models/address';
import { AddressService } from '../../../core/services/address.service';
import { AuthService } from '../../../core/services/auth.service';
import { AddressListComponent } from '../../address/components/address-list/address-list.component';

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [AddressListComponent],
  templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.scss'
})
export class CheckoutPageComponent implements OnInit {

  router = inject(Router);
  toastService = inject(ToastrService);
  authService = inject(AuthService);
  addressService = inject(AddressService);
  selectedAddress!: AddressDto;
  isLogged: Boolean = this.authService.isLogged();

  ngOnInit(): void {
    this.isLogged ? null : (() => {
      this.toastService.show("NECESSÁRIO LOGIN PARA REALIZAR CHECKOUT");
      this.router.navigate(["signin"]);
    })();
  }

  onAddressSelected(address: AddressDto): void {
    this.selectedAddress = address;
  }


  cancel() { }
  confirm() { }

}
