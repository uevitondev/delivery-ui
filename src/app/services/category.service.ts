import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { CategoryDto } from '../model/category/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  ENV = environment;
  http = inject(HttpClient);

  constructor() { }

  findAllCategories(): Observable<CategoryDto[]> {
    return this.http.get<CategoryDto[]>(`${this.ENV.API_URL}/categories`);
  }

  findCategoryById(id: string): Observable<CategoryDto> {
    return this.http.get<CategoryDto>(`${this.ENV.API_URL}/categories/${id}`);
  }

}
