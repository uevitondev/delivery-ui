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
  @Input() currentPageSize: number = 4;
  @Input() pages: number[] = [];

  @Output() changePaginatorEvent = new EventEmitter<{ pageNumber: number, pageSize: number }>();

  selectedPageSize: any;

  constructor() { }

  previousOffset() {
    this.onChangePageNumber(this.currentPageNumber - 1);
  }

  nextOffset() {
    this.onChangePageNumber(this.currentPageNumber + 1);
  }

  onChangePaginator() {
    this.changePaginatorEvent.emit({
      pageNumber: this.currentPageNumber,
      pageSize: this.selectedPageSize
    });
  }

  onChangePageNumber(pageNumber: number) {
    this.currentPageNumber = pageNumber;
    this.onChangePaginator();
  }

  onChangePageSize() {
    this.currentPageNumber = 0;
    this.onChangePaginator();
  }


}