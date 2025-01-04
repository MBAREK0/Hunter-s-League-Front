import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiUrl = 'http://localhost:8081/api/auth/register';

  constructor(private http: HttpClient) {}

  register(payload: any): Observable<any> {
    return this.http.post(this.apiUrl, payload);
  }
}
