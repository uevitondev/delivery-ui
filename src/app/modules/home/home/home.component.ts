import { Component, inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { RouterService } from '../../../core/services/router.service';
import { StorageService } from '../../../core/services/storage.service';
import { ListStoreComponent } from '../../store/list-store/list-store.component';
import { StoreHomeComponent } from '../../store/store-home/store-home.component';

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

  routerService = inject(RouterService);
  storageService = inject(StorageService);
  STORED_STORE = environment.STORED_STORE;

  hasStoredStore: boolean = false;

  ngOnInit(): void {
    const storedStore = this.storageService.get(this.STORED_STORE);
    storedStore ? (() => {
      this.hasStoredStore = true;
      let storeName: string = storedStore.name.split(' ').join('').toLowerCase();
      this.routerService.toHomeStore(storeName);
    })()
      : (() => {
        this.hasStoredStore = false;
        this.routerService.toHome();
      })()

  }


}
