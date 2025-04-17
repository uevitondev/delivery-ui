import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from './category';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly apiUrl = environment.API_URL;
  private readonly http = inject(HttpClient);

  constructor() { }

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/categories`);
  }

  getById(id: string): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/categories/${id}`);
  }
}
