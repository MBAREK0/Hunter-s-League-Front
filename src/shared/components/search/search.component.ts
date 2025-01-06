import {Component, EventEmitter, Input, input, Output} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import { Competition } from '../../../core/models/competition';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    ReactiveFormsModule,CommonModule
  ],
  templateUrl: './search.component.html'
})
export class SearchComponent {
  @Input() title!: string;
  @Input() formGroup!: FormGroup;
  @Output() SearchChange = new EventEmitter<string>();
  @Output() SortChange = new EventEmitter<string>();

  // save Competition fields names in array to use in sort select
  sorts: { key: string; value: string }[] = [
    { key: 'Date', value: 'date' },
    { key: 'Location', value: 'location' },
    { key: 'Type', value: 'speciesType' },
  ];



  onSearchChange(event: any): void {
    console.log("Search change", event.target.value);
    const searchKeyword = event.target.value;
    this.SearchChange.emit(searchKeyword);
  }
  onSortChange(event: any): void {
    console.log("Sort change", event.target.value);
    const sortKeyword = event.target.value;
    this.SortChange.emit(sortKeyword);
  }
}
