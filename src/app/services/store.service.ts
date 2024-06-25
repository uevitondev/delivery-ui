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
  ENV = environment;
  storageService = inject(StorageService);
  http = inject(HttpClient);

  constructor() { }

  findAllStores(): Observable<StoreDto[]> {
    return this.http.get<StoreDto[]>(`${this.ENV.API_URL}/stores`);
  }

  hasStoredStore(): boolean {
    const storedStore = this.storageService.get(this.ENV.STORED_STORE);
    return storedStore ? true : false;  
  }


}
