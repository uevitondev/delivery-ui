import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { StorageService } from '../../services/storage.service';
import { UtilService } from '../../utils/util.service';
import { Store } from '../store';

@Component({
  selector: 'app-storecard',
  imports: [],
  templateUrl: './storecard.component.html',
  styleUrl: './storecard.component.scss',
})
export class StoreCardComponent {
  @Input() store!: Store;
  @Input() redirectUrl: string = '';
  @Output() selectedStoreEvent = new EventEmitter<Store>();

  router = inject(Router);
  utilService = inject(UtilService);
  storageService = inject(StorageService);
  storedStore = environment.STORED_STORE;

  onSelect() {
    this.selectedStoreEvent.emit(this.store);
    this.storageService.save(this.storedStore, this.store);
  }


  public finalUrlByStoreId(storeId: string) {
    return `/seller/stores/${storeId}/management`;
  }

  onRedirect() {
    if (this.redirectUrl) {
      this.router.navigate([this.redirectUrl]);
    }
  }
}
