import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule, } from '@angular/forms';

@Component({
  selector: 'app-image-upload-view',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './image-upload-view.component.html',
  styleUrl: './image-upload-view.component.scss',
})
export class FileUploadComponent {
  @Input() label: string = '';
  @Output() imageUploaded = new EventEmitter<File>();

  imageForm: FormGroup;
  imagePreview: string | null = null;

  constructor(private fb: FormBuilder) {
    this.imageForm = this.fb.group({
      image: [null],
    });
  }

  onFileChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.imageForm.patchValue({ image: file });
      this.imageForm.get('image')?.updateValueAndValidity();
      this.imageUploaded.emit(file);

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
}
