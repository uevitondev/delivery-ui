import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InputFormComponent } from '../../input-form/input-form.component';

@Component({
  selector: 'app-address-form',
  standalone: true,
  imports: [ReactiveFormsModule, InputFormComponent],
  templateUrl: './address-form.component.html',
  styleUrl: './address-form.component.scss'
})
export class AddressFormComponent {

  router = inject(Router);
  toast = inject(ToastrService);
  //dialogRef = inject();
  addressForm!: FormGroup;


  constructor() {
    this.addressForm = new FormGroup({
      id: new FormControl('', [Validators.required]),
      zipCode: new FormControl('', [Validators.required]),
      uf: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      district: new FormControl('', [Validators.required]),
      street: new FormControl('', [Validators.required]),
      complement: new FormControl('', [Validators.required,]),
      number: new FormControl('', [Validators.required])
    });
  }




}
