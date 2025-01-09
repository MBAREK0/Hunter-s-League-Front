import { Component } from '@angular/core';
import {CompetitionListComponent} from "../competition/user/competition-list/competition-list.component";


@Component({
  selector: 'app-home',
  standalone: true,
  template : `<app-competition-list/>`,
  imports: [
    CompetitionListComponent
  ]})
export class HomeComponent {}
