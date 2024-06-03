import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { StoreDto } from '../model/store/store-dto';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  apiUrl = environment.apiUrl;
  storageService = inject(StorageService);
  http = inject(HttpClient);

  constructor() { }

  findAllStores(): Observable<StoreDto[]> {
    return this.http.get<StoreDto[]>(`${this.apiUrl}/stores`);
  }

  hasStoreSelected(): boolean {
    const store = this.storageService.get(environment.store);
    if (store != null) {
      return true;
    }
    return false;
  }


}
