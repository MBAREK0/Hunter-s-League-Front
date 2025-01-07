import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly registerUri = `${environment.apiUrl}/auth/register`;
  private readonly loginUri = `${environment.apiUrl}/auth/login`;
  private readonly refreshTokenUrl = `${environment.apiUrl}/auth/refresh`;

  constructor(private http: HttpClient) {}

  register(payload: any): Observable<any> {
    return this.http.post(this.registerUri, payload);
  }

  login(payload: any): Observable<any> {
    return this.http.post(this.loginUri, payload);
  }


  refreshAccessToken(refreshToken: string): Observable<any> {
    const headers = new HttpHeaders({
      'X-Refresh-Token': refreshToken // Add custom header with refresh token
    });
    return this.http.post<any>(this.refreshTokenUrl, {}, { headers });
  }
}
