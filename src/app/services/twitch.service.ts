import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Summoner } from '../models/summoner';
import { Observable } from 'rxjs';
import { TwitchUser } from '../models/twitch-user';

@Injectable({
  providedIn: 'root'
})
export class TwitchService {

  private http = inject(HttpClient);

  private twitchEndpoint = 'api/twitch/live';

  private baseUrl = "http://localhost:8080"

  isLive(username: string): Observable<TwitchUser> {
    return this.http.get<TwitchUser>(`${this.baseUrl}/${this.twitchEndpoint}/${username}`);
  }

}