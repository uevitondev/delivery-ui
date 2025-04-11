
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Address } from '../address';

@Component({
  selector: 'app-address-card',
  imports: [],
  templateUrl: './address-card.component.html',
  styleUrl: './address-card.component.scss',
})
export class AddressCardComponent implements OnInit {

  @Input() address!: Address;
  @Input() showActions: boolean = false;
  @Input() isSelectable: boolean = false;
  @Input() isUpdatable: boolean = false;
  @Input() isDeletable: boolean = false;
  @Input() isSelected: boolean = false;
  @Input() selectedId!: string | null;

  @Output() onSelectEvent = new EventEmitter<Address>();
  @Output() onUpdateEvent = new EventEmitter<Address>();
  @Output() onDeleteEvent = new EventEmitter<Address>();

  ngOnInit(): void {

  }

  onSelect() {
    this.onSelectEvent.emit(this.address);
  }

  onUpdate() {
    this.onUpdateEvent.emit(this.address);
  }

  onDelete() {
    this.onDeleteEvent.emit(this.address);
  }


}
