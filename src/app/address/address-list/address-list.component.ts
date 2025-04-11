import { PortalModule } from '@angular/cdk/portal';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Address } from '../address';
import { AddressCreateComponent } from '../address-create/address-create.component';
import { AddressUpdateComponent } from '../address-edit/address-update.component';
import { AddressService } from '../address.service';
import { AddressCardComponent } from '../address-card/address-card.component';
import { ToastrService } from 'ngx-toastr';
import { ModalComponent } from '../../modal/modal.component';
import { AuthService } from '../../auth/auth.service';
import { ErrorHandlerService } from '../../services/error-handler.service';
import { ModalService, ModalOverlayRef } from '../../services/modal.service';

@Component({
  selector: 'app-address-list',
  imports: [ModalComponent, AddressCreateComponent, AddressCardComponent, AddressUpdateComponent, PortalModule,],
  templateUrl: './address-list.component.html',
  styleUrl: './address-list.component.scss',
})
export class AddressListComponent implements OnInit {
  @Input() isAddable: boolean = false;
  @Input() isSelectable: boolean = false;
  @Input() isEditable: boolean = false;
  @Input() isDeletable: boolean = false;
  @Input() isSelected: boolean = false;

  @Input() selectedId!: string | null;

  @Output() onSelectedEvent = new EventEmitter<Address>();

  toastService = inject(ToastrService);
  modalService = inject(ModalService);
  authService = inject(AuthService);
  addressService = inject(AddressService);
  errorHandlerService = inject(ErrorHandlerService);

  modalOverlayRef!: ModalOverlayRef;
  addresses: Address[] = [];
  isLoading = false;

  ngOnInit(): void {
    this.onLoadAddresses();
  }

  onLoadAddresses() {
    this.isLoading = true;
    this.addressService.getAllByUser().subscribe({
      next: (response) => {
        if (response.length >= 1) {
         // this.onSelectedEvent.emit(response[0]);
        }
        this.addresses = response;
        this.isLoading = false;
      },
      error: (e) => {
        this.isLoading = false;
        this.errorHandlerService.handleError(e);
      },
    });
  }

  selectAddress(address: Address): void {
    this.onSelectedEvent.emit(address);
  }


  deleteAddress(address: Address): void {
    this.addressService.deleteAddressById(address.id).subscribe({
      next: (response) => {
        this.toastService.success("Endereço Excluído");
        this.onLoadAddresses();
      },
      error: (e) => {
        this.errorHandlerService.handleError(e);
      }
    }
    );
  }


}
