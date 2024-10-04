import { Component, inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { StorageService } from '../../../core/services/storage.service';
import { ListStoreComponent } from '../../store/list-store/list-store.component';
import { StoreHomeComponent } from '../../store/store-home/store-home.component';
import { Store } from '../../../core/models/store';

@Component({
  selector: 'app-home-layout',
  standalone: true,
  imports: [
    StoreHomeComponent,
    ListStoreComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {


  storageService = inject(StorageService);
  STORED_STORE = environment.STORED_STORE;

  store!: Store;

  ngOnInit(): void {
    const storedStore = this.storageService.get(this.STORED_STORE);
    storedStore ? (() => {
      this.store = storedStore;
      return;
    })()
      : (() => {
        return;
      })()

  }


}
