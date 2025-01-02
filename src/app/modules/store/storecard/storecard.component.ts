import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Store } from '../../../core/models/store';
import { environment } from '../../../../environments/environment';
import { StorageService } from '../../../core/services/storage.service';
import { UtilService } from '../../../core/services/util.service';

@Component({
  selector: 'app-storecard',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './storecard.component.html',
  styleUrl: './storecard.component.scss'
})
export class StoreCardComponent {

  router = inject(Router);
  utilService = inject(UtilService);
  storageService = inject(StorageService);
  storedStore = environment.STORED_STORE;

  @Input() store!: Store;
  @Output() selectedStoreEvent = new EventEmitter<Store>();


  onSelect() {
    this.selectedStoreEvent.emit(this.store);
    this.storageService.save(this.storedStore,  this.store);
  }
  
}
