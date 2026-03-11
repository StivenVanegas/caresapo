import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrentGame } from '../models/current-game';

@Injectable({
  providedIn: 'root'
})
export class SpectatorService {

  private http = inject(HttpClient);

  private spectatorEndpoint = 'api/spectator';

  private baseUrl = "http://localhost:8080"

  getCurrentGame(): Observable<CurrentGame> {
    return this.http.get<CurrentGame>(`${this.baseUrl}/${this.spectatorEndpoint}`);
  }

}
