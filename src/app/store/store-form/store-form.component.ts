import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NewStore } from '../new-store';
import { StoreService } from '../store.service';
import { FileUploadComponent } from '../../image-upload-view/image-upload-view.component';
import { LoadingComponent } from '../../loading/loading.component';
import { ErrorHandlerService } from '../../services/error-handler.service';

@Component({
  selector: 'app-store-form',
  imports: [ReactiveFormsModule, FileUploadComponent, LoadingComponent],
  templateUrl: './store-form.component.html',
  styleUrl: './store-form.component.scss',
})
export class StoreFormComponent {
  @Output() submitNewStoreEvent = new EventEmitter<void>();
  types: string[] = ['PIZZERIA', 'RESTAURANT'];

  private readonly router = inject(Router);
  private readonly toastService = inject(ToastrService);
  private readonly storeService = inject(StoreService);
  private readonly errorHandlerService = inject(ErrorHandlerService);

  newStoreForm!: FormGroup;
  isLoading = false;

  ngOnInit(): void {
    this.onInitNewStoreForm();
  }

  onInitNewStoreForm() {
    this.newStoreForm = new FormGroup({
      logoFile: new FormControl<string | Blob>('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
    });
  }

  onImageUploaded(file: File) {
    this.newStoreForm.patchValue({ logoFile: file });
    this.newStoreForm.get('logoFile')?.updateValueAndValidity();
  }

  changeType(e: any) { }

  prepareFormData(): FormData {
    const newStore: NewStore = {
      name: this.newStoreForm.get('name')?.value,
      phoneNumber: this.newStoreForm.get('phoneNumber')?.value,
      type: this.newStoreForm.get('type')?.value
    }
    const logoFile = this.newStoreForm.get('logoFile')?.value;

    const formData = new FormData();
    formData.append('logoFile', logoFile);
    formData.append('newStore', new Blob([JSON.stringify(newStore)], { type: "application/json" }));

    return formData;
  }

  onSubmit() {
    if (this.newStoreForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.newStoreForm.disable();
    const formData = this.prepareFormData();
    this.storeService.saveNewStoreBySeller(formData).subscribe({
      next: (response) => {
        this.submitNewStoreEvent.emit();
        this.toastService.success('NOVA LOJA CADASTRADA COM SUCESSO!');
        this.isLoading = false;
        this.router.navigate(['seller/store-management']);
      },
      error: (e) => {
        this.newStoreForm.enable();
        this.isLoading = false;
        this.errorHandlerService.handleError(e);
      },
    });
  }

  get logoFile() {
    return this.newStoreForm.get('logoFile');
  }

  get name() {
    return this.newStoreForm.get('name');
  }

  get phoneNumber() {
    return this.newStoreForm.get('phoneNumber');
  }

  get type() {
    return this.newStoreForm.get('type');
  }
}
