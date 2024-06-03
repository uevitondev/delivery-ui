import { Injectable } from '@angular/core';
import { AuthResponse } from '../model/auth/auth-response';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private storage: Storage;

  constructor() {
    //this.storage = window.sessionStorage;
    this.storage = window.localStorage;
  }  

  save(key: string, value: any) {
    this.storage.removeItem(key);
    this.storage.setItem(key, JSON.stringify(value));
  }

  get(key: string): any {
    const value = this.storage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
  }

  remove(key: string) {
    this.storage.removeItem(key);
  }

  clear() {
    this.storage.clear();
  }

}
