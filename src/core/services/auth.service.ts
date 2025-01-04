import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiUrl = `${environment.apiUrl}/auth/register`;

  constructor(private http: HttpClient) {}



  register(payload: any): Observable<any> {
    return this.http.post(this.apiUrl, payload);
  }
}
