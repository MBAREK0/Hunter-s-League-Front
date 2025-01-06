import { Component } from '@angular/core';
import {AsyncPipe, CommonModule} from '@angular/common';
import { CompetitionCardComponent } from '../component/competition-card/competition-card.component';
import { CompetitionService } from '../../../core/services/competition.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-competition-list',
  standalone: true,
  imports: [CompetitionCardComponent, AsyncPipe,CommonModule],
  templateUrl: './competition-list.component.html'
})
export class CompetitionListComponent {
  competitions$: Observable<any[]>;

  constructor(private competitionService: CompetitionService) {
    this.competitions$ = this.competitionService.getCompetitions();
  }
}
