import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {Page} from "../models/page";
import {User} from "../models/user";


@Injectable({
  providedIn: 'root'
})
export class Userservice {

  private readonly baseUrl = `${environment.apiUrl}/v1/users`;

  constructor(private http: HttpClient) { }

  getUsers(search: string = '',sort: string = '', page: number = 0, size: number = 10): Observable<Page<User>> {
    let params = new HttpParams();
    if (search) params = params.set('searchKeyword', search);
    params = params.set('sortField', sort);
    params = params.set('page', page.toString());
    params = params.set('size', size.toString());


    return this.http.get<any>(this.baseUrl, { params })
  }

  getuserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

  createuser(user: any): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}`, user);
  }

  updateuser(user: any): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/${user.id}`, user);
  }

  deleteuser(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

}

