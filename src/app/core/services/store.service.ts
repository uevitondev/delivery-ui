import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Store } from '../models/store';
import { StorageService } from './storage.service';

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

}
