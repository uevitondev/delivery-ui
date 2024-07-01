import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AddressDto } from '../../../../core/models/address';
import { AddressService } from '../../../../core/services/address.service';
import { AuthService } from '../../../../core/services/auth.service';
import { AddressFormComponent } from '../address-form/address-form.component';

@Component({
  selector: 'app-address-list',
  standalone: true,
  imports: [],
  templateUrl: './address-list.component.html',
  styleUrl: './address-list.component.scss'
})
export class AddressListComponent implements OnInit {

  @Input() isSelectable: boolean = false;
  @Output() addressSelected = new EventEmitter<AddressDto>();
  toastService = inject(ToastrService);
  router = inject(Router);
  addressService = inject(AddressService);
  authService = inject(AuthService);
  dialog = inject(MatDialog);
  addresses: AddressDto[] = [];


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

  selectAddress(address: AddressDto): void {
    this.addressSelected.emit(address);
  }

}
