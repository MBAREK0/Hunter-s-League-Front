import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CompetitionService {

  private readonly baseUrl = `${environment.apiUrl}/v1/competition`;

  constructor(private http: HttpClient) { }

  getCompetitions(search: string = '',sort: string = '', page: number = 1, size: number = 10): Observable<any> {
    let params = new HttpParams();
    if (search) params = params.set('searchKeyword', search);
    params = params.set('sortField', sort);
    params = params.set('page', page.toString());
    params = params.set('size', size.toString());

    return this.http.get<any>(this.baseUrl, { params });
  }
}

