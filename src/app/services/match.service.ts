import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Match } from '../models/match';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  private http = inject(HttpClient);

  private matchEndpoint = 'api/match';

  private baseUrl = "http://localhost:8080"

  getMatches(server: string): Observable<Match[]> {
    return this.http.get<Match[]>(`${this.baseUrl}/${this.matchEndpoint}/${server}`);
  }

}