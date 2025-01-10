import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Observable } from 'rxjs';
import {AsyncPipe, CommonModule} from "@angular/common";
import {Competition} from "../../../../core/models/competition";

@Component({
  selector: 'app-competition-table',
  standalone: true,
  imports: [
    AsyncPipe,
   CommonModule
  ],
  templateUrl: './table.component.html'
})
export class TableComponent  {
  @Input() data$!: Observable<any[]>;
  @Output() editButtonClicked = new EventEmitter<any>();
  @Output() deleteButtonClicked = new EventEmitter<any>();
  @Output() viewButtonClicked = new EventEmitter<any>();

  onEditButtonClicked(id : string) {
    this.editButtonClicked.emit(id);
  }
  onDeleteButtonClicked(id : string) {
    this.deleteButtonClicked.emit(id);
  }

  onViewButtonClicked(competition : Competition) {
    this.viewButtonClicked.emit(competition);
  }
}
