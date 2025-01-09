import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {Page} from "../models/page";
import {Competition} from "../models/competition";


@Injectable({
  providedIn: 'root'
})
export class CompetitionService {

  private readonly baseUrl = `${environment.apiUrl}/v1/competition`;

  constructor(private http: HttpClient) { }

  getCompetitions(search: string = '',sort: string = '', page: number = 0, size: number = 10): Observable<Page<Competition>> {
    let params = new HttpParams();
    if (search) params = params.set('searchKeyword', search);
    params = params.set('sortField', sort);
    params = params.set('page', page.toString());
    params = params.set('size', size.toString());

    return this.http.get<any>(this.baseUrl, { params })
  }

  getCompetitionById(id: string): Observable<Competition> {
    return this.http.get<Competition>(`${this.baseUrl}/${id}`);
  }

  createCompetition(competition: any): Observable<Competition> {
    console.log('CompetitionService.createCompetition', competition);
    return this.http.post<Competition>(`${this.baseUrl}`, {
      location: competition.location,
      date: competition.date,
      speciesType: competition.speciesType,
      minParticipants: competition.minParticipants,
      maxParticipants: competition.maxParticipants});
  }

  updateCompetition(competition: any): Observable<Competition> {
    return this.http.put<Competition>(`${this.baseUrl}/${competition.id}`, competition);
  }


}

