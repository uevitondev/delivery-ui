import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Output() closeModalEvent = new EventEmitter<boolean>(false);

  constructor() { }

  ngOnInit() {
  }

  public closeModal() {
    this.closeModalEvent.emit(true);
  }

}
