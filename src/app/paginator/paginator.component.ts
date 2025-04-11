import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-paginator',
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss',
})
export class PaginatorComponent {
  @Input() currentPageNumber: number = 0;
  @Input() currentPageSize: number = 12;
  @Input() pages: number[] = [];

  @Output() changePaginatorEvent = new EventEmitter<{
    pageNumber: number;
    pageSize: number;
  }>();

  sizePages: number[] = [2, 4, 8, 12];

  constructor() {}

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
      pageSize: this.currentPageSize,
    });
  }
}
