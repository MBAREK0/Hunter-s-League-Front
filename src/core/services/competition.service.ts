import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CompetitionService {

  private readonly baseUrl = `${environment.apiUrl}/v1/competition`;

  constructor(private http: HttpClient) { }

  // private getHeaders(): HttpHeaders {
  //   const token = localStorage.getItem('authToken');
  //   return new HttpHeaders({
  //     'Authorization': `Bearer ${token}`,
  //     'Content-Type': 'application/json',
  //     'Accept': 'application/json'
  //   });
  // }

  getCompetitions(): Observable<any> {
    // const headers = this.getHeaders();
    return this.http.get(this.baseUrl);
  }
}
