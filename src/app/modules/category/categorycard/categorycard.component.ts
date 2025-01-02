import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../../core/models/product';
import { Category } from '../../../core/models/category';

@Component({
    selector: 'app-categorycard',
    imports: [RouterLink, CommonModule, NgOptimizedImage],
    templateUrl: './categorycard.component.html',
    styleUrl: './categorycard.component.scss'
})
export class CategoryCardComponent {
  @Input() category!: Category;
  @Input() isSelected: boolean = false;
  @Output() onSelectEvent = new EventEmitter<Category>();

  onSelect(category: Category) {
    this.onSelectEvent.emit(category);
  }
}
