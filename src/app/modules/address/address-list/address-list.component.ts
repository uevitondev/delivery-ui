import { PortalModule, TemplatePortal } from '@angular/cdk/portal';
import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild, inject } from '@angular/core';
import { Address } from '../../../core/models/address';
import { AddressService } from '../../../core/services/address.service';
import { AuthService } from '../../../core/services/auth.service';
import { ErrorHandlerService } from '../../../core/services/error-handler.service';
import { ModalService, TemplateModalOverlayRef } from '../../../core/services/modal.service';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { AddressFormComponent } from '../address-form/address-form.component';
import { AddressCardComponent } from '../addresscard/addresscard.component';

@Component({
  selector: 'app-address-list',
  standalone: true,
  imports: [
    ModalComponent,
    AddressFormComponent,
    AddressCardComponent,
    PortalModule
  ],
  templateUrl: './address-list.component.html',
  styleUrl: './address-list.component.scss'
})
export class AddressListComponent implements OnInit {

  private templateRef!: TemplateModalOverlayRef;
  @ViewChild('modalTemplate') modalTemplate!: TemplatePortal<any>;

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

  addresses: Address[] = [];
  isLoading = false;

  ngOnInit(): void {
    this.onLoadAddresses();
  }

  public openTemplateModal() {
    this.templateRef = this.modalService.open(this.modalTemplate, {}, {
      hasBackdropClick: true
    });
  }

  public closeTemplateModal() { 
    this.templateRef.close();
  }

  onLoadAddresses(): void {
    this.isLoading = true;
    this.addressService.getAllByUser().subscribe({
      next: (response) => {
        this.addresses = response; 
        this.isLoading = false;
      },
      error: (e) => {
        this.isLoading = false;
        this.errorHandlerService.handleError(e, "OCORREU UM ERRO AO CARREGAR ENDEREÇOS");
      }
    });
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
