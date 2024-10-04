import { Location } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Address } from '../../../core/models/address';
import { AddressService } from '../../../core/services/address.service';
import { AuthService } from '../../../core/services/auth.service';
import { RouterService } from '../../../core/services/router.service';

@Component({
  selector: 'app-address-list',
  standalone: true,
  imports: [],
  templateUrl: './address-list.component.html',
  styleUrl: './address-list.component.scss'
})
export class AddressListComponent implements OnInit {

  @Input() isAddable: boolean = false;
  @Input() isSelectable: boolean = false;
  @Input() isEditable: boolean = false;
  @Input() isDeletable: boolean = false;

  @Output() selectedAddressEvent = new EventEmitter<Address>();

  toastService = inject(ToastrService);
  routerService = inject(RouterService);
  authService = inject(AuthService);
  addressService = inject(AddressService);
  location = inject(Location);

  addresses: Address[] = [];
  defaultAddress!: Address;

  ngOnInit(): void {
    this.loadAddresses();
  }

  goBack() {
    this.location.back();
  }

  loadAddresses(): void {
    this.addressService.getAllByUser().subscribe({
      next: (addresses) => {
        this.addresses = addresses;
        if (this.addresses.length != 0) {
          this.defaultAddress = this.addresses[0];
        }
      },
      error: (e) => {
        this.toastService.error("Erro ao listar endereços!");
      }
    });
  }

  newAddress() { }

  editAddress(address: Address) { }


  selectAddress(address: Address): void {
    this.selectedAddressEvent.emit(address);
  }


  deleteAddress(addressId: string): void {
    this.addressService.deleteAddressById(addressId).subscribe(() => {
      this.loadAddresses();
    });
  }





}
