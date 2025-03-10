import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ErrorHandlerService } from '../../../core/services/error-handler.service';
import { Address } from '../address';
import { AddressService } from '../address.service';

@Component({
  selector: 'app-address-new',
  imports: [ReactiveFormsModule, MatDialogModule],
  templateUrl: './address-new.component.html',
  styleUrl: './address-new.component.scss',
})
export class AddressNewComponent implements OnInit {

  @Input() title: string = "Novo Endereço";
  @Input() address!: Address;
  @Input() isAddressNew: boolean = false;
  @Input() isAddressEdit: boolean = false;

  @Output() addressFormValidEvent = new EventEmitter<boolean>(false);
  @Output() addressFormSubmitedSuccessEvent = new EventEmitter<boolean>(false);

  addressForm!: FormGroup;
  isLoading = false;

  toastService = inject(ToastrService);
  addressService = inject(AddressService);
  errorHandlerService = inject(ErrorHandlerService);

  ngOnInit(): void {
    this.buildAddressForm();
    this.observeZipCode();
    this.onValueChangesAddressForm();
  }

  onValueChangesAddressForm() {
    this.addressForm.valueChanges.subscribe(() => {
      this.addressFormValidEvent.emit(!this.addressForm.invalid);
    });
  }

  buildAddressForm() {
    this.addressForm = new FormGroup(
      {
        id: new FormControl(''),
        name: new FormControl('', [Validators.required]),
        phoneNumber: new FormControl('', [Validators.required]),
        zipCode: new FormControl('', [Validators.required, Validators.maxLength(8)]),
        street: new FormControl('', [Validators.required]),
        number: new FormControl('', [Validators.required]),
        district: new FormControl('', [Validators.required]),
        complement: new FormControl(''),
        city: new FormControl('', [Validators.required]),
        uf: new FormControl('', [Validators.required]),
      },
      this.zipCodeValidator('zipCode'),
    );

    if (this.address && this.isAddressEdit) {
      this.addressForm.patchValue(this.address);
    }
  }

  zipCodeValidator(zipCode: string): Validators {
    return (formGroup: AbstractControl): { [key: string]: any } | null => {
      const zipCodeControl = formGroup.get(zipCode);
      if (!zipCodeControl) {
        return null;
      }
      if (zipCodeControl.errors && !zipCodeControl.errors['invalid']) {
        return null;
      }
      const zipCodeValue = zipCodeControl.value;
      const validZipCode = /^[0-9]{8}$/;
      if (!validZipCode.test(zipCodeValue)) {
        zipCodeControl.setErrors({ invalid: true });
        return { invalid: true };
      } else {
        zipCodeControl.setErrors(null);
        return null;
      }
    };
  }

  observeZipCode() {
    this.addressForm.get('zipCode')?.valueChanges.subscribe((zipCode) => {
      const validZipCode = /^[0-9]{8}$/;
      if (!validZipCode.test(zipCode)) {
        return;
      } else {
        this.addressService.getAddressViaCepByCep(zipCode).subscribe({
          next: (response) => {
            this.addressForm.patchValue({
              street: response.logradouro,
              district: response.bairro,
              city: response.localidade,
              uf: response.uf,
            });
          },
          error: (e) => {
            this.errorHandlerService.handleError(e);
          },
        });
      }
    });
  }

  onSubmit() {
    if (this.addressForm.invalid) {
      return;
    }
    if (this.isAddressNew) {
      this.newAddress();
    } else {
      this.updateAddress();
    }
  }



  newAddress() {
    this.isLoading = true;
    this.addressForm.disable();

    this.addressService.newAddress(this.addressForm.value).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.toastService.success('ENDEREÇO SALVO');
        this.addressFormSubmitedSuccessEvent.emit(true);
        //this.submitNewAddressEvent.emit();
      },
      error: (e) => {
        this.isLoading = false;
        this.addressForm.enable();
        this.errorHandlerService.handleError(e);
      },
    });
  }

  updateAddress() {
    this.isLoading = true;
    this.addressForm.disable();
    this.addressService.updateAddress(this.id?.value, this.addressForm.value).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.toastService.success('ENDEREÇO ATUALIZADO');
        this.addressFormSubmitedSuccessEvent.emit(true);
        //this.submitUpdateAddressEvent.emit();
      },
      error: (e) => {
        this.isLoading = false;
        this.addressForm.enable();
        this.errorHandlerService.handleError(e);
      },
    });
  }

  get id() {
    return this.addressForm.get('id');
  }

  get name() {
    return this.addressForm.get('name');
  }

  get phoneNumber() {
    return this.addressForm.get('phoneNumber');
  }

  get street() {
    return this.addressForm.get('street');
  }

  get number() {
    return this.addressForm.get('number');
  }

  get district() {
    return this.addressForm.get('district');
  }

  get complement() {
    return this.addressForm.get('complement');
  }

  get city() {
    return this.addressForm.get('city');
  }

  get uf() {
    return this.addressForm.get('uf');
  }

  get zipCode() {
    return this.addressForm.get('zipCode');
  }
}
