import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from './category';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  ENV = environment;
  http = inject(HttpClient);

  constructor() {}

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.ENV.API_URL}/categories`);
  }

  getById(id: string): Observable<Category> {
    return this.http.get<Category>(`${this.ENV.API_URL}/categories/${id}`);
  }
}
