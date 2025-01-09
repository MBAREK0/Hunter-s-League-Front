import { Component, EventEmitter, Input, Output } from '@angular/core';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html'
})
export class PaginationComponent {
  @Input() totalPages!: number;
  @Input() currentPage!: number;
  @Input() size!: number;

  @Output() PageChange = new EventEmitter<number>();
  @Output() SizeChange = new EventEmitter<number>();


  get firstPages(): number[] {
    const startPage = this.currentPage; // Assuming one-based
    const endPage = Math.min(this.currentPage + 4, this.totalPages); // Show 5 pages max, including current

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  }




  showLastPages(): boolean {
    return this.currentPage < this.totalPages - 7;
  }

  get lastPages(): number[] {
    const startPage = Math.max(this.totalPages - 3, 0);
    const endPage = this.totalPages;
    if(this.showLastPages())
    return Array.from({ length: Math.min(3, this.totalPages - startPage) }, (_, i) => startPage + i);
    return [];
  }


  showEllipsisBeforeLastPages(): boolean {
    return this.totalPages > 8 && this.currentPage < this.totalPages - 3 && this.currentPage < this.totalPages - 7;
  }


  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i);
  }

  changePage(page: number): void {
    console.log('Page', this.firstPages);
    this.PageChange.emit(page);
  }

  onSizeChange(event: any): void {
    const size = parseInt(event.target.value, 10);
    this.SizeChange.emit(size);
  }

  protected readonly console = console;
}
