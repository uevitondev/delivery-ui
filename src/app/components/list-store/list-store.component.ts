import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { StoreDto } from '../../model/store/store-dto';
import { StorageService } from '../../services/storage.service';
import { StoreService } from '../../services/store.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-store',
  standalone: true,
  imports: [],
  templateUrl: './list-store.component.html',
  styleUrl: './list-store.component.scss'
})
export class ListStoreComponent {
  storageService = inject(StorageService);
  storeService = inject(StoreService);
  toastService = inject(ToastrService);
  router = inject(Router);
  stores!: StoreDto[];

  constructor(){
    this.fetchStores();
  }


  fetchStores(){
    this.storeService.findAllStores().subscribe({
      next: (stores) => {
        this.stores = stores;
      },
      error: (error) => {
        this.toastService.error("Erro ao listar Lojas!");
      }
    });
  }

  selectStore(store: any){
    this.storageService.remove(environment.store);
    this.storageService.save(environment.store, store);
    
    this.router.navigate(["store"]);
    this.toastService.info("Loja Selecionada!");
  }

}
