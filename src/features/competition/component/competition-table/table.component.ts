import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Observable } from 'rxjs';
import {AsyncPipe, CommonModule} from "@angular/common";

@Component({
  selector: 'app-competition-table',
  standalone: true,
  imports: [
    AsyncPipe,
   CommonModule
  ],
  templateUrl: './table.component.html'
})
export class TableComponent implements OnInit {
  @Input() data$!: Observable<any[]>;
  @Output() editButtonClicked = new EventEmitter<any>();


  ngOnInit(): void {
    console.log('TableComponent created with observable:', this.data$);
  }

  onEditButtonClicked(id : string) {
    this.editButtonClicked.emit(id);
  }
}
