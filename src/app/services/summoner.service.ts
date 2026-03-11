import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Summoner } from '../models/summoner';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SummonerService {

  private http = inject(HttpClient);

  private summonerEndpoint = 'api/summoner';

  private baseUrl = "http://localhost:8080"

  getSummoner(server: string): Observable<Summoner> {
    return this.http.get<Summoner>(`${this.baseUrl}/${this.summonerEndpoint}/${server}`);
  }

}
