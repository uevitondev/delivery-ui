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
    this.onChangePage(this.currentPageNumber - 1);
  }

  nextOffset() {
    this.onChangePage(this.currentPageNumber + 1);
  }

  onChangePaginator() {
    this.changePaginatorEvent.emit({
      pageNumber: this.currentPageNumber,
      pageSize: this.selectedPageSize
    });
  }

  onChangePage(pageNumber: number): void {
    console.log("on change page number: " + pageNumber);
    this.currentPageNumber = pageNumber;
    this.onChangePaginator();
  }

  onChangePageSize() {
    console.log("on change page size: " + this.selectedPageSize);
    this.currentPageNumber = 0;
    this.onChangePaginator();
  }


}