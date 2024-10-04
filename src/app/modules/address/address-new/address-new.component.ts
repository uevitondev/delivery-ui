import { Component, OnInit, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { AddressService } from '../../../core/services/address.service';
import { InputFormComponent } from '../../../shared/components/input-form/input-form.component';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-address-new',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputFormComponent,
    MatDialogModule
  ],
  templateUrl: './address-new.component.html',
  styleUrl: './address-new.component.scss'
})

export class AddressNewComponent implements OnInit {

  location = inject(Location);
  toastService = inject(ToastrService);
  addressService = inject(AddressService);
  newAddressForm!: FormGroup;
  isLoading = false;

  ngOnInit(): void {
    this.initNewAddressForm();
    this.observeZipCode();
  }

  goBack(){ 
    this.location.back();
  }

  initNewAddressForm() {
    this.newAddressForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required]),
      zipCode: new FormControl('', [Validators.required]),
      street: new FormControl('', [Validators.required]),
      number: new FormControl('', [Validators.required]),
      district: new FormControl('', [Validators.required]),
      complement: new FormControl(''),
      city: new FormControl('', [Validators.required]),
      uf: new FormControl('', [Validators.required])
    }, this.zipCodeValidator('zipCode')
    );
  }

  zipCodeValidator(zipCode: string): Validators {
    return (formGroup: AbstractControl): { [key: string]: any } | null => {
      const zipCodeControl = formGroup.get(zipCode);
      if (!zipCodeControl) {
        return null;
      }
      if (
        zipCodeControl.errors &&
        !zipCodeControl.errors['invalid']
      ) {
        return null;
      }
      const zipCodeValue = zipCodeControl.value;
      const validZipCode = /^[0-9]{8}$/;
      if (!validZipCode.test(zipCodeValue)) {
        zipCodeControl.setErrors({ invalid: true });
        return { invalid: true }
      } else {
        zipCodeControl.setErrors(null);
        return null;
      }
    };
  }


  observeZipCode() {
    this.newAddressForm.get('zipCode')?.valueChanges.subscribe(zipCode => {
      const validZipCode = /^[0-9]{8}$/;
      if (!validZipCode.test(zipCode)) {
        return;
      } else {
        this.addressService.getAddressViaCepByCep(zipCode).subscribe({
          next: (response) => {
            this.newAddressForm.patchValue({
              street: response.logradouro,
              district: response.bairro,
              city: response.localidade,
              uf: response.uf
            });
          },
          error: (e) => {
            console.error(e);
          }
        })
      }
    })
  }

  close() {
  }

  onSubmit() {
    if(this.newAddressForm.invalid){
      return;
    }

    this.isLoading = true;
    this.newAddressForm.disable();

    this.addressService.newAddress(this.newAddressForm.value).subscribe({
      next: data => {
        this.toastService.success("Endereço Cadastrado Com Sucesso!");
        this.goBack();
      },
      error: e => {
        this.isLoading = false;
        this.newAddressForm.enable();
        this.toastService.error("Erro Ao Cadastrar Endereço!");
        return;
      }
    });


  }



  get name() {
    return this.newAddressForm.get('name');
  }

  get phoneNumber() {
    return this.newAddressForm.get('phoneNumber');
  }

  get street() {
    return this.newAddressForm.get('street');
  }

  get number() {
    return this.newAddressForm.get('number');
  }

  get district() {
    return this.newAddressForm.get('district');
  }

  get complement() {
    return this.newAddressForm.get('complement');
  }

  get city() {
    return this.newAddressForm.get('city');
  }

  get uf() {
    return this.newAddressForm.get('uf');
  }

  get zipCode() {
    return this.newAddressForm.get('zipCode');
  }


}
