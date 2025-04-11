import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '../category';

@Component({
  selector: 'app-categorycard',
  imports: [CommonModule],
  templateUrl: './categorycard.component.html',
  styleUrl: './categorycard.component.scss',
})
export class CategoryCardComponent {
  @Input() category!: Category;
  @Input() isSelected: boolean = false;
  @Output() onSelectEvent = new EventEmitter<Category>();

  onSelect(category: Category) {
    this.onSelectEvent.emit(category);
  }
}
