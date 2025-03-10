import { PortalModule } from '@angular/cdk/portal';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ErrorHandlerService } from '../../../core/services/error-handler.service';
import { ModalOverlayRef, ModalService } from '../../../core/services/modal.service';
import { ModalComponent } from '../../../modules/shared/modal/modal.component';
import { AuthService } from '../../auth/auth.service';
import { Address } from '../address';
import { AddressNewComponent } from '../address-new/address-new.component';
import { AddressService } from '../address.service';
import { AddressCardComponent } from '../addresscard/addresscard.component';

@Component({
  selector: 'app-address-list',
  imports: [ModalComponent, AddressNewComponent, AddressCardComponent, PortalModule,
  ],
  templateUrl: './address-list.component.html',
  styleUrl: './address-list.component.scss',
})
export class AddressListComponent implements OnInit {


  @Input() addressFormSuccessSubmited!: Observable<boolean>;
  @Input() isAddable: boolean = false;
  @Input() isSelectable: boolean = false;
  @Input() isEditable: boolean = false;
  @Input() isDeletable: boolean = false;
  @Input() isSelected: boolean = false;
  @Input() selectedId!: string;
  @Output() selectedAddressEvent = new EventEmitter<Address>();

  modalService = inject(ModalService);
  authService = inject(AuthService);
  addressService = inject(AddressService);
  errorHandlerService = inject(ErrorHandlerService);

  modalOverlayRef!: ModalOverlayRef;
  addresses: Address[] = [];
  isLoading = false;
  childrenFormsIsValid: boolean = false;

  ngOnInit(): void {
    this.onLoadAddresses();
  }

  onLoadAddresses() {
    this.isLoading = true;
    this.addressService.getAllByUser().subscribe({
      next: (response) => {
        this.addresses = response;
        this.isLoading = false;
      },
      error: (e) => {
        this.isLoading = false;
        this.errorHandlerService.handleError(e);
      },
    });
  }

  onSubmitedAddressFormSuccess() {
    this.addressFormSuccessSubmited.subscribe(value => {
      if (value) {
        console.log(value);
        this.onLoadAddresses();
      }
    })
  }


  selectAddress(address: Address): void {
    this.selectedAddressEvent.emit(address);
  }


  deleteAddress(addressId: string): void {
    this.addressService.deleteAddressById(addressId).subscribe(() => {
      this.onLoadAddresses();
    });
  }


}
