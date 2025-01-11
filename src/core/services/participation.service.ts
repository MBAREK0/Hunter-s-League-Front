import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {JwtService} from "./jwt.service";

@Injectable({
  providedIn: 'root'
})
export class ParticipationService {


  private readonly baseUrl = `${environment.apiUrl}/v1/participation`;

  constructor(private http: HttpClient,
              private jwtService:  JwtService) {
  }

  participate(competition_id: string): Observable<any> {
    const token = localStorage.getItem('authToken');

    this.jwtService.getDecodedAccessToken(token);

    return this.http.post<any>(this.baseUrl, {
      user: this.jwtService.getDecodedAccessToken(token).id,
      competition: competition_id
    });
  }
}
