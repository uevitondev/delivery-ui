import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Category } from '../../../core/models/category';
import { CategoryService } from '../../../core/services/category.service';
import { InputFormComponent } from '../../../shared/components/input-form/input-form.component';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputFormComponent
  ],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent implements OnInit {

  @Input() isChecked: boolean = false;
  @Output() selectedCategoryEvent = new EventEmitter<Category>();

  toastService = inject(ToastrService);
  categoryService = inject(CategoryService);

  checkForm!: FormGroup;

  categories!: Category[];
  category!: Category;

  ngOnInit(): void {
    this.loadCategories();
  }

  initCheckForm() {
    this.checkForm = new FormGroup({
      checkboxes: new FormArray([])
    });
    this.categories.forEach(() => this.checkboxesArray.push(new FormControl(false)));
  }

  get checkboxesArray() {
    return this.checkForm.controls['checkboxes'] as FormArray;
  }

  onCheck(index: number) {
    this.checkboxesArray.controls.forEach((control, i) => {
      if (control.value === true && index == i) {
        control.setValue(true);
      } else {
        control.setValue(false);
      }
    });
    let hasChecked = false;
    this.checkboxesArray.value.forEach((checkbox: boolean) => {
      if (checkbox === true) {
        hasChecked = true;
      }
    });

    if (hasChecked) {
      const selectedCategory = this.categories[index];
      this.selectCategory(selectedCategory);
    } else {
      this.selectCategory({
        id: '',
        name: ''
      });
    }

  }


  loadCategories() {
    this.categoryService.getAll().subscribe({
      next: (categories) => {
        this.categories = categories;
        this.initCheckForm();
      },
      error: (error) => {
        throw new Error();
      }
    });
  }

  selectCategory(category: Category) {
    this.selectedCategoryEvent.emit(category);
  }

}





