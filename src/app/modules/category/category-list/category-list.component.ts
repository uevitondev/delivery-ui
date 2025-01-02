import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { Category } from '../../../core/models/category';
import { CategoryService } from '../../../core/services/category.service';
import { ErrorHandlerService } from '../../../core/services/error-handler.service';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';
import { CommonModule } from '@angular/common';
import { CategoryCardComponent } from '../categorycard/categorycard.component';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoadingComponent,
    CategoryCardComponent,
  ],
  templateUrl: './category-list.component.html',
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
        this.errorHandlerService.handleError(
          e,
          'OCORREU UM ERRO AO CARREGAR CATEGORIAS',
        );
      },
    });
  }

  onSelectCategory(category: Category) {
    if (this.selectedCategory && this.selectedCategory.name === category.name) {
      let undefinedCategory!: Category;
      this.selectedCategory = undefinedCategory;
      this.selectedCategoryEvent.emit(this.selectedCategory);
    } else{
      this.selectedCategory = category;
      this.selectedCategoryEvent.emit(this.selectedCategory);
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
