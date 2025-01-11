import { Component, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { CompetitionCardComponent } from '../../component/competition-card/competition-card.component';
import { CompetitionService } from '../../../../core/services/competition.service';
import { Observable, of } from 'rxjs';
import {FormControl, FormGroup} from '@angular/forms';
import { SearchComponent } from "../../../../shared/components/search/search.component";
import {PaginationComponent} from "../../../../shared/components/pagination/pagination.component";
import {ParticipationService} from "../../../../core/services/participation.service";

@Component({
  selector: 'app-competition-list',
  standalone: true,
  imports: [CompetitionCardComponent, AsyncPipe, CommonModule, SearchComponent, PaginationComponent],
  templateUrl: './competition-list.component.html'
})
export class CompetitionListComponent implements OnInit {
  competitions$: Observable<any[]> = of([]);
  totalPages$: Observable<any> = of();
  currentPage$: Observable<any> = of();
  competitionId$: Observable<string> = of('');
  created$: Observable<boolean> = of(false);
  errorServer: string | null = null;

  searchForm: FormGroup;

  constructor(
    private competitionService: CompetitionService,
    private participationService: ParticipationService) {
    this.searchForm = new FormGroup({
      search: new FormControl(''),
      sort: new FormControl('Date'),
      page: new FormControl(0),
      size: new FormControl(10),
    });


  }

  ngOnInit(): void {
    this.fetchCompetitions(this.searchForm.value);


  }

  fetchCompetitions(formValues: any): Observable<any[]> {
    const { search, sort, page, size } = formValues;
     this.competitionService.getCompetitions(search, sort, page, size).subscribe(
        (data) => {
          this.competitions$ = of(data.content);
          this.totalPages$ = of(data.totalPages);
          this.currentPage$ = of(data.number);

        }
    );
    return this.competitions$
  }

  onSearchChange(searchKeyWord: string): void {
    this.searchForm.patchValue({ search: searchKeyWord });
    this.fetchCompetitions(this.searchForm.value);
  }

  participate(competitionId: string): void {
    this.participationService.participate(competitionId).subscribe(
      {
        next: (response) => {
          this.competitionId$ = of(competitionId);
          this.created$ = of(true);
          setTimeout(() => {
            this.created$ = of(false);
          }, 3000);

          this.errorServer = null;
        },
        error: (error) => {
          if (error.status.toString().startsWith('4'))
          this.errorServer = error.error?.message || 'Participation failed';
          this.competitionId$ = of(competitionId);
         setTimeout(() => {
            this.errorServer = null;

         }, 3000);

        }
      }
    );
  }

  onSortChange(sortKeyWord: string): void {
    this.searchForm.patchValue({ sort: sortKeyWord });
    this.fetchCompetitions(this.searchForm.value);
  }

  onSizeChange(size: number): void {
    this.searchForm.patchValue({ size });
    this.fetchCompetitions(this.searchForm.value);
  }

  onChangePage(page: number): void {
    this.searchForm.patchValue({ page });
    this.fetchCompetitions(this.searchForm.value); }



}
