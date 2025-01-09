import {Component, OnInit} from '@angular/core';
import {TableComponent} from "../../component/competition-table/table.component";
import {SearchComponent} from "../../../../shared/components/search/search.component";
import {CompetitionFormComponent} from "../../component/competition-form/competition-form.component";
import {Observable, of} from "rxjs";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {CompetitionService} from "../../../../core/services/competition.service";
import {AsyncPipe, NgIf} from "@angular/common";
import {PaginationComponent} from "../../../../shared/components/pagination/pagination.component";
import {Competition} from "../../../../core/models/competition";

@Component({
  selector: 'app-list-competition',
  standalone: true,
  imports: [
    TableComponent,
    SearchComponent,
    CompetitionFormComponent,
    AsyncPipe,
    PaginationComponent,
    NgIf
  ],
  templateUrl: './admin-list-competition.component.html'
})
export class AdminListCompetitionComponent  implements OnInit{
  competitions$: Observable<any[]> = of([]);
  totalPages$: Observable<any> = of();
  currentPage$: Observable<any> = of();
  selectedCompetition$: Observable<any> = of();

  searchForm: FormGroup;
  errorServer: string | null = null;
  loading: boolean = false;
  created: boolean = false;

  iscanvasVisible = true; // Controls the visibility of the offcanvas


  constructor(
    private competitionService: CompetitionService,
    private fb: FormBuilder
  ) {
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


  protected readonly console = console;

  onCreateCompetition($event: Competition) {

    this.errorServer = null;
    this.loading = true;
    const formattedEvent = {
      ...$event,
      date: new Date($event.date).toISOString().slice(0, 19)
    };

    this.competitionService.createCompetition(formattedEvent).subscribe(
      {
        next: () => {
          this.loading = false;
          this.fetchCompetitions(this.searchForm.value);
          this.created = true;
          setTimeout(() => {
            this.created = false;
          }, 3000);
        },
        error: (error) => {
          this.loading = false;
          this.errorServer = error.error?.message || 'Competition creation  failed';
        }
      }
    );
  }

  onSearchChange(searchKeyWord: string): void {
    this.searchForm.patchValue({ search: searchKeyWord });
    this.fetchCompetitions(this.searchForm.value);
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
    this.fetchCompetitions(this.searchForm.value);
  }

  onEditCompetition($event: string) {
    console.log('evnt Edit competition', $event);

    this.competitionService.getCompetitionById($event).subscribe(
      {
        next: (data) => {

          data.date = data.date.slice(0, 10);
          this.selectedCompetition$ = of(data);

          console.log('selectedCompetition', data);
        },
        error: (error) => {
          console.error('Error while fetching competition', error);
        }
      }
    )
  }

  onUpdateCompetition($event: Competition) {


    this.errorServer = null;
    this.loading = true;
    const formattedEvent = {
      ...$event,
      date: new Date($event.date).toISOString().slice(0, 19)
    };

    this.competitionService.updateCompetition(formattedEvent).subscribe(
      {
        next: () => {
          this.loading = false;
          this.fetchCompetitions(this.searchForm.value);
          this.created = true;
          setTimeout(() => {
            this.created = false;
          }, 3000);
        },
        error: (error) => {
          this.loading = false;
          this.errorServer = error.error?.message || 'Competition creation  failed';
        }
      }
    );
  }

}
