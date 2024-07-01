import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddressDto } from '../../../../core/models/address';
import { AddressService } from '../../../../core/services/address.service';
import { InputFormComponent } from '../../../../shared/components/input-form/input-form.component';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-address-form',
  standalone: true,
  imports: [ReactiveFormsModule, InputFormComponent, MatDialogModule],
  templateUrl: './address-form.component.html',
  styleUrl: './address-form.component.scss'
})

export class AddressFormComponent implements OnInit {

  dialogRef = inject(MatDialogRef<AddressFormComponent>);
  data: AddressDto = inject(MAT_DIALOG_DATA)
  addressService = inject(AddressService);
  addressForm!: FormGroup;

  ngOnInit(): void {
    console.log("data: " + this.data);
    this.addressForm = new FormGroup({
      street: new FormControl(this.data.street),
      number: new FormControl(this.data.number),
      district: new FormControl(this.data.district),
      complement: new FormControl(this.data.complement),
      city: new FormControl(this.data.city),
      uf: new FormControl(this.data.uf),
      zipCode: new FormControl(this.data.zipCode)
    });
  }


  save(): void {
    this.addressService.updateAddress(this.data.id, this.addressForm.value).subscribe(() => {
      this.dialogRef.close(true);
    });
  }

  close(): void {
    this.dialogRef.close(false);
  }

}
