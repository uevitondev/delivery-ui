import { CdkPortal } from '@angular/cdk/portal';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ModalOverlayRef, ModalService } from '../../../core/services/modal.service';
import { ModalComponent } from "../../../modules/shared/modal/modal.component";
import { Address } from '../address';
import { AddressEditComponent } from '../address-edit/address-edit.component';
import { OverlayRef } from '@angular/cdk/overlay';


@Component({
  selector: 'app-addresscard',
  imports: [CdkPortal, ModalComponent, AddressEditComponent],
  templateUrl: './addresscard.component.html',
  styleUrl: './addresscard.component.scss',
})
export class AddressCardComponent {
  @Input() address!: Address;
  @Input() isSelectable: boolean = false;
  @Input() isEditable: boolean = false;
  @Input() isDeletable: boolean = false;
  @Input() isSelected: boolean = false;
  @Input() selectedId!: string;
  @Output() selectedAddressEvent = new EventEmitter<Address>();
  @Output() reloadAddressesEvent = new EventEmitter<boolean>(false);

  modalService = inject(ModalService);

  childrenFormsIsValid: boolean = false;
  modalOverlayRef!: ModalOverlayRef;


  onSelect() {
    this.selectedAddressEvent.emit(this.address);
  }

  setChildrenFormsIsValid(event: boolean) {
    this.childrenFormsIsValid = event;
  }

  submitAddressForm(event: boolean) {
    if (event) {
      //this.addressFormComponent.onSubmit();
      this.reloadAddressesEvent.emit(event);
      this.modalService.close(this.modalOverlayRef);
    }
  }


  onDelete() {
    throw new Error('Method not implemented.');
  }


}
