import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CategoryDto } from '../../../core/models/category';
import { CategoryService } from '../../../core/services/category.service';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent implements OnInit {

  @Input() isSelectable: boolean = false;
  @Output() eventSelectedCategory = new EventEmitter<CategoryDto>();
  category!: CategoryDto;

  toastService = inject(ToastrService);
  categoryService = inject(CategoryService);
  categories!: CategoryDto[];

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getAll().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        this.toastService.error("Erro ao Carregar Categorias de Produtos!");
      }
    });
  }

  selectCategory(category: CategoryDto) {
    this.eventSelectedCategory.emit(category);
  }

}
