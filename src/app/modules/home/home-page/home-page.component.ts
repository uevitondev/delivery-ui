import { Component, inject, OnInit } from '@angular/core';
import { HomeLayoutComponent } from '../home-layout/home-layout.component';
import { StorePageComponent } from '../../store/store-page/store-page.component';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment.development';
import { StorageService } from '../../../core/services/storage.service';
import { ListStoreComponent } from '../../store/list-store/list-store.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    HomeLayoutComponent,
    StorePageComponent,
    ListStoreComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {

  router = inject(Router);
  storageService = inject(StorageService);
  STORED_STORE = environment.STORED_STORE;

  hasStoredStore: boolean = false;

  ngOnInit(): void {
    const storedStore = this.storageService.get(this.STORED_STORE);
    storedStore ? (() => {
      this.hasStoredStore = true;
      let storeName: string = storedStore.name.split(' ').join('').toLowerCase();
      this.router.navigate(["home", storeName]);
    })()
      : (() => {
        this.hasStoredStore = false;
        this.router.navigate(["home"]);
      })() 

  }



}
