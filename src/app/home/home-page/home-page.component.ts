import { Component, inject } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { StoreListComponent } from '../../store/store-list/store-list.component';

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
