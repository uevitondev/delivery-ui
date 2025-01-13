import { Component, inject } from '@angular/core';
import { StorageService } from '../../../core/services/storage.service';
import { StoreListComponent } from '../../store/store-list/store-list.component';

@Component({
  selector: 'app-home-layout',
  imports: [
    StoreListComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  storageService = inject(StorageService);

  ngOnInit(): void {

  }


}
