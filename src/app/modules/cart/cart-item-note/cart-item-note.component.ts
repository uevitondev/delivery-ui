import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CartItem } from '../../../core/models/cart-item';
import { CartService } from '../../../core/services/cart.service';
import { InputFormComponent } from '../../../shared/components/input-form/input-form.component';
import { ToastrService } from 'ngx-toastr';

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
  @Input() cartItem!: CartItem;

  toastService = inject(ToastrService);
  cartService = inject(CartService);
  noteForm!: FormGroup;
  maxLengthNote: number = 120;

  ngOnInit(): void {
    this.initNoteForm();
  }

  initNoteForm() {
    this.noteForm = new FormGroup({
      note: new FormControl(this.cartItem.note, [Validators.required, Validators.maxLength(this.maxLengthNote)])
    });
  }

  saveNote() {
    if (this.noteForm.invalid) {
      return;
    }
    this.cartService.addNoteToCartItem(this.cartItem, this.noteForm.value.note);
    this.toastService.info("NOTA SALVA");
  }

}
