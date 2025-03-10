import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorHandlerService } from '../../../core/services/error-handler.service';
import { FileUploadComponent } from '../../../modules/shared/image-upload-view/image-upload-view.component';
import { Category } from '../../category/category';
import { CategoryService } from '../../category/category.service';
import { Store } from '../../store/store';
import { NewProduct } from '../new-product';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FileUploadComponent],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
})
export class ProductFormComponent implements OnInit {

  @Input() product!: Product;
  @Input() store!: Store;
  @Input() formTitle!: string;

  @Output() productFormIsInvalid = new EventEmitter<boolean>(true);

  private readonly errorHandlerService = inject(ErrorHandlerService);
  private readonly productService = inject(ProductService);
  private readonly categoryService = inject(CategoryService);

  productForm!: FormGroup;
  isLoading: boolean = false;
  categories: Category[] = [];


  ngOnInit(): void {
    this.onInitProductForm();
    this.onValueChangesProductForm();
  }

  onValueChangesProductForm() {
    this.productForm.valueChanges.subscribe(() => {
      this.productFormIsInvalid.emit(this.productForm.invalid);
    });
  }

  onInitProductForm() {
    this.productForm = new FormGroup({
      imgFile: new FormControl<string | Blob>('', [Validators.required]),
      id: new FormControl(this.product ? this.product.id : ''),
      name: new FormControl(this.product ? this.product.name : '', Validators.required),
      description: new FormControl(this.product ? this.product.description : '', Validators.required),
      price: new FormControl(this.product ? this.product.price : '', Validators.required),
      categoryId: new FormControl(this.product ? this.product.categoryId : '', [Validators.required]),
      storeId: new FormControl(this.product ? this.product.storeId : this.store.id, Validators.required),
    });



    this.categoryService.getAll().subscribe({
      next: (response) => {
        this.categories = response;
      },
      error: (e) => {
        this.errorHandlerService.handleError(e);
      },
    });
  }


  onImageUploaded(file: File) {
    this.productForm.patchValue({ imgFile: file });
    this.productForm.get('imgFile')?.updateValueAndValidity();
  }


  prepareFormData(): FormData {
    const newProduct: NewProduct = {
      name: this.productForm.get('name')?.value,
      description: this.productForm.get('description')?.value,
      price: this.productForm.get('price')?.value,
      categoryId: this.productForm.get('categoryId')?.value,
      storeId: this.productForm.get('storeId')?.value,
    }
    const imgFile = this.productForm.get('imgFile')?.value;

    const formData = new FormData();
    formData.append('imgFile', imgFile);
    formData.append('newProduct', new Blob([JSON.stringify(newProduct)], { type: "application/json" }));

    return formData;
  }

  onSubmit() {

    console.log(this.productForm.value);
    if (this.productForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.productForm.disable();
    const formData = this.prepareFormData();
    this.productService.saveNewProduct(formData).subscribe({
      next: (response) => {
        //this.submitNewProductEvent.emit();
        //this.toastService.success('PRODUTO CADASTRADO COM SUCESSO!');
        this.isLoading = false;
      },
      error: (e) => {
        this.productForm.enable();
        this.isLoading = false;
        this.errorHandlerService.handleError(e);
      },
    });
  }

  get id() {
    return this.productForm.get('id');
  }

  get name() {
    return this.productForm.get('name');
  }

  get description() {
    return this.productForm.get('description');
  }

  get price() {
    return this.productForm.get('price');
  }

  get categoryId() {
    return this.productForm.get('categoryId');
  }

  get storeId() {
    return this.productForm.get('storeId');
  }

  get imgFile() {
    return this.productForm.get('imgFile');
  }


}
