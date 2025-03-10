import { Component, inject } from '@angular/core';
import { StorageService } from '../../../core/services/storage.service';
import { StoreListComponent } from '../../../domains/store/store-list/store-list.component';

@Component({
  selector: 'app-home-page',
  imports: [StoreListComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  storageService = inject(StorageService);

  ngOnInit(): void { }
}
