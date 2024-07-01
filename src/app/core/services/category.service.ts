import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { CategoryDto } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  ENV = environment;
  http = inject(HttpClient);

  constructor() { }

  getAll(): Observable<CategoryDto[]> {
    return this.http.get<CategoryDto[]>(`${this.ENV.API_URL}/categories`);
  }

  getById(id: string): Observable<CategoryDto> {
    return this.http.get<CategoryDto>(`${this.ENV.API_URL}/categories/${id}`);
  }

}
