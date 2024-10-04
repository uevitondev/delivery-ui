import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Address } from '../../../core/models/address';
import { AddressService } from '../../../core/services/address.service';
import { InputFormComponent } from '../../../shared/components/input-form/input-form.component';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-address-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputFormComponent,
    MatDialogModule
  ],
  templateUrl: './address-edit.component.html',
  styleUrl: './address-edit.component.scss'
})

export class AddressEditComponent implements OnInit {

  dialogRef = inject(MatDialogRef<AddressEditComponent>);
  data: Address = inject(MAT_DIALOG_DATA)
  addressService = inject(AddressService);
  addressForm!: FormGroup;

  ngOnInit(): void {
    this.addressForm = new FormGroup({
      name: new FormControl(this.data.name),
      phoneNumber: new FormControl(this.data.phoneNumber),
      street: new FormControl(this.data.street),
      number: new FormControl(this.data.number),
      district: new FormControl(this.data.district),
      complement: new FormControl(this.data.complement),
      city: new FormControl(this.data.city),
      uf: new FormControl(this.data.uf),
      zipCode: new FormControl(this.data.zipCode)
    });
  }


  close(): void {
    this.dialogRef.close(false);
  }


  save(): void {
    this.addressService.updateAddress(this.data.id, this.addressForm.value).subscribe(() => {
      this.dialogRef.close(true);
    });
  }


}
