import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { Store } from '../store';
import { StorageService } from '../../../core/services/storage.service';
import { UtilService } from '../../../core/utils/util.service';

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
  

  public finalUrlByStoreId(storeId: string){
    return `/seller/stores/${storeId}/management`;
  }

  onRedirect() {
    if (this.redirectUrl) {
      this.router.navigate([this.redirectUrl]);
    }
  }
}
