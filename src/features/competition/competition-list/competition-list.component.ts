import { Component, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { CompetitionCardComponent } from '../component/competition-card/competition-card.component';
import { CompetitionService } from '../../../core/services/competition.service';
import { Observable, of } from 'rxjs';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { SearchComponent } from "../../../shared/components/search/search.component";

@Component({
  selector: 'app-competition-list',
  standalone: true,
  imports: [CompetitionCardComponent, AsyncPipe, CommonModule, SearchComponent],
  templateUrl: './competition-list.component.html'
})
export class CompetitionListComponent implements OnInit {
  competitions$: Observable<any[]> = of([]);
  searchForm: FormGroup;

  constructor(
    private competitionService: CompetitionService,
    private fb: FormBuilder
  ) {
    this.searchForm = new FormGroup({
      search: new FormControl(''),
      sort: new FormControl('Date'),
      page: new FormControl(1),
      size: new FormControl(30),
    });

  }

  ngOnInit(): void {
    this.fetchCompetitions(this.searchForm.value);


  }

  fetchCompetitions(formValues: any): Observable<any[]> {
    const { search, sort, page, size } = formValues;
    this.competitions$ = this.competitionService.getCompetitions(search, sort, page, size);
    return this.competitions$;
  }

  onSearchChange(searchKeyWord: string): void {
    this.searchForm.patchValue({ search: searchKeyWord });
    this.fetchCompetitions(this.searchForm.value);
  }

  onSortChange(sortKeyWord: string): void {
    this.searchForm.patchValue({ sort: sortKeyWord });
    this.fetchCompetitions(this.searchForm.value);
  }


}
