import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '../../../core/models/store';

@Component({
  selector: 'app-storec',
  standalone: true,
  imports: [],
  templateUrl: './storec.component.html',
  styleUrl: './storec.component.scss'
})
export class StorecComponent {
  @Input() logoUrl!: string;
  @Input() name!: string;
  @Input() phoneNumber!: string;
  @Input() type!: string;

  @Output() storeSelectedEvent = new EventEmitter<Store>();

  onSelect(){
   
  }

}
