import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { StorageService } from './storage.service';
import { Store } from '../models/store';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  ENV = environment;
  storageService = inject(StorageService);
  http = inject(HttpClient);

  constructor() { }

  getAll(): Observable<Store[]> {
    return this.http.get<Store[]>(`${this.ENV.API_URL}/stores`);
  }

  hasStoreInStored(): boolean {
    const storedStore = this.storageService.get(this.ENV.STORED_STORE);
    return storedStore ? true : false;
  }


}
