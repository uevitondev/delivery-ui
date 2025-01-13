import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Address } from '../../../core/models/address';

@Component({
  selector: 'app-addresscard',
  imports: [
  ],
  templateUrl: './addresscard.component.html',
  styleUrl: './addresscard.component.scss'
})
export class AddressCardComponent {

  @Input() address!: Address;

  @Input() isSelectable: boolean = false;
  @Input() isEditable: boolean = false;
  @Input() isDeletable: boolean = false;
  @Input() isSelected: boolean = false;
  @Input() selectedId!: string;

  @Output() selectedAddressEvent = new EventEmitter<Address>();

  onSelect() {
    this.selectedAddressEvent.emit(this.address);
  }

  onEdit() { }
  onDelete() { }

  toggle() { }

}
