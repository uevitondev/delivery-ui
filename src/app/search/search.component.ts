import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators, } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-search',
  imports: [MatIconModule, FormsModule, ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit {
  @Input() placeHolder: string = 'Seu PlaceHolder';
  @Output() searchEvent = new EventEmitter<string>();

  searchForm!: FormGroup;
  searchedTerm: string | null = null;

  ngOnInit(): void {
    this.onInitSearchForm();
    this.searchForm.get('searchValue')?.valueChanges.subscribe((value) => {
      if (value === '') {
        this.clearSearch();
      }
    });
  }

  onInitSearchForm() {
    this.searchForm = new FormGroup({
      searchValue: new FormControl('', [
        Validators.required,
        Validators.maxLength(25),
      ]),
    });
  }

  enterSearch(event: any) {
    this.search();
  }

  search(event?: Event) {
    if (event) {
      event.preventDefault(); // Impede o reload da página
    }

    if (this.searchForm.invalid) {
      return;
    }

    this.searchedTerm = this.searchValue?.value;
    this.searchEvent.emit(this.searchValue?.value);
  }

  clearSearch() {
    this.searchedTerm = null;
    this.searchForm.reset();
    this.searchEvent.emit('');
  }

  get searchValue() {
    return this.searchForm.get('searchValue');
  }
}
