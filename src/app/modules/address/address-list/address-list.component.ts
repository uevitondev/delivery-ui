import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Address } from '../../../core/models/address';
import { AddressService } from '../../../core/services/address.service';
import { AuthService } from '../../../core/services/auth.service';
import { AddressFormComponent } from '../address-form/address-form.component';
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

  dialog = inject(MatDialog);
  toastService = inject(ToastrService);
  routerService = inject(RouterService);
  authService = inject(AuthService);
  addressService = inject(AddressService);

  addresses: Address[] = [];

  ngOnInit(): void {
    this.loadAddresses();
  }

  loadAddresses(): void {
    this.addressService.getAllByUser().subscribe({
      next: (addresses) => {
        this.addresses = addresses;
      },
      error: (e) => {
        this.toastService.error("Erro ao listar endereços!");
      }
    });
  }

  newAddress() {}

  selectAddress(address: Address): void {
    this.selectedAddressEvent.emit(address);
  }

  editAddress(address: any): void {
    const dialogRef = this.dialog.open(AddressFormComponent, {
      width: '50%',
      data: address
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadAddresses();
      }
    });
  }

  deleteAddress(addressId: string): void {
    this.addressService.deleteAddress(addressId).subscribe(() => {
      this.loadAddresses();
    });
  }



  

}
