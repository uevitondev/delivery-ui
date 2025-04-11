import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Category } from '../category';
import { CategoryService } from '../category.service';
import { CategoryCardComponent } from '../categorycard/categorycard.component';
import { ErrorHandlerService } from '../../services/error-handler.service';
import { LoadingComponent } from '../../loading/loading.component';

@Component({
  selector: 'app-category-list',
  imports: [CommonModule, ReactiveFormsModule, LoadingComponent, CategoryCardComponent,], templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss',
})
export class CategoryListComponent implements OnInit {
  errorHandlerService = inject(ErrorHandlerService);
  categoryService = inject(CategoryService);

  @Output() selectedCategoryEvent = new EventEmitter<Category>();

  isLoading: boolean = false;
  checkForm!: FormGroup;
  categories!: Category[];
  selectedCategory!: Category;

  //isSelected: boolean = false;

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.isLoading = true;
    this.categoryService.getAll().subscribe({
      next: (categories) => {
        this.categories = categories;
        this.isLoading = false;
      },
      error: (e) => {
        this.isLoading = false;
        this.errorHandlerService.handleError(e);
      },
    });
  }

  onSelectCategory(category: Category) {
    if (this.selectedCategory && this.selectedCategory.name === category.name) {
      let undefinedCategory!: Category;
      this.selectedCategory = undefinedCategory;
      this.selectedCategoryEvent.emit(this.selectedCategory);
      console.log("categoria selecionada x")
    } else {
      this.selectedCategory = category;
      this.selectedCategoryEvent.emit(this.selectedCategory);
      console.log("categoria selecionada y")
    }
  }

  onNull() {
    console.log('null');
    this.selectedCategoryEvent.emit(undefined);
  }

  isSelected(category: Category) {
    if (this.selectedCategory && this.selectedCategory.name == category.name) {
      this.selectedCategory = category;
      return true;
    }
    return false;
  }
}
