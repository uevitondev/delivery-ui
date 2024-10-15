import { Component, inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Store } from '../../../core/models/store';
import { StorageService } from '../../../core/services/storage.service';
import { StoreHomeComponent } from '../../store/store-home/store-home.component';
import { StoreListComponent } from '../../store/store-list/store-list.component';

@Component({
  selector: 'app-home-layout',
  standalone: true,
  imports: [
    StoreHomeComponent,
    StoreListComponent
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
