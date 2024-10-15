import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-paginator',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './my-paginator.component.html',
  styleUrl: './my-paginator.component.scss'
})
export class MyPaginatorComponent {

  @Input() currentPageNumber: number = 0;
  @Input() currentPageSize: number = 12;
  @Input() pages: number[] = [];

  @Output() changePaginatorEvent = new EventEmitter<{ pageNumber: number, pageSize: number }>();

  sizePages: number[] = [2, 4, 8, 12];

  constructor() { }

  previousOffset() {
    this.onChangePageNumber(this.currentPageNumber - 1);
  }

  onChangePageNumber(pageNumber: number) {
    this.currentPageNumber = pageNumber;
    this.onChangePaginator();
  }

  nextOffset() {
    this.onChangePageNumber(this.currentPageNumber + 1);
  }

  onChangePageSize() {
    this.currentPageNumber = 0;
    this.onChangePaginator();
  }

  onChangePaginator() {
    this.changePaginatorEvent.emit({
      pageNumber: this.currentPageNumber,
      pageSize: this.currentPageSize
    });
  }


}