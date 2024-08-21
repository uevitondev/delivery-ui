import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { InputFormComponent } from '../../../shared/components/input-form/input-form.component';
import { CartItem } from '../../../core/models/cart-item';
import { CartService } from '../../../core/services/cart.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Address } from '../../../core/models/address';

@Component({
  selector: 'app-cart-item-note',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputFormComponent,
    MatDialogModule
  ],
  templateUrl: './cart-item-note.component.html',
  styleUrl: './cart-item-note.component.scss'
})
export class CartItemNoteComponent implements OnInit {

  dialogRef = inject(MatDialogRef<CartItemNoteComponent>);
  data: CartItem = inject(MAT_DIALOG_DATA)
  @Output() noteItemEvent = new EventEmitter<string>();

  cartService = inject(CartService);
  noteForm!: FormGroup;
  noteMaxLength = 60;
  noteIsValid = true;

  ngOnInit(): void {
    this.noteForm = new FormGroup({
      note: new FormControl(this.data.note, [Validators.required, Validators.maxLength(this.noteMaxLength)])
    });
  }

  handleValueChange(event: any) {
    console.log(event);
    if (this.noteForm.invalid) {
      this.noteIsValid = false;
      console.log("nota invalida: " + this.noteForm.value.note);
      return;
    }

    this.noteItemEvent.emit(this.noteForm.value.note);
    console.log("nota valida: " + this.noteForm.value.note);
  }

  close(): void {
    this.dialogRef.close(false);
  }

  save() {
    this.cartService.addNote(this.data, this.noteForm.value.note);
    this.dialogRef.close(true);
  }

}
