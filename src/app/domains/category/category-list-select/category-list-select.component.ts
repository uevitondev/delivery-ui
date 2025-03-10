import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorHandlerService } from '../../../core/services/error-handler.service';
import { Category } from '../category';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-list-select',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './category-list-select.component.html',
  styleUrl: './category-list-select.component.scss',
})
export class CategoryListSelectComponent implements OnInit {

  errorHandlerService = inject(ErrorHandlerService);
  categoryService = inject(CategoryService);

  @Output() selectedCategoryEvent = new EventEmitter<Category>();
  @Output() selectedAllCategoriesEvent = new EventEmitter<Category>();

  isLoading: boolean = false;
  categories!: Category[];
  selectedCategory!: Category;
  categorySelectForm!: FormGroup;

  ngOnInit(): void {
    this.loadCategories();
    this.onInitCategorySelectForm();
    this.onValueChangesCategorySelectForm();
  }

  onInitCategorySelectForm() {
    this.categorySelectForm = new FormGroup({
      category: new FormControl(''),
    });
  }

  onValueChangesCategorySelectForm() {
    this.categorySelectForm.valueChanges.subscribe(value => {
      if (value.category == "") {
        this.selectedAllCategoriesEvent.emit(this.selectedCategory);
      } else {
        this.selectedCategory = value.category;
        this.selectedCategoryEvent.emit(this.selectedCategory);
      }
    });
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

}


