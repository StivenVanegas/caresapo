import { Component, inject, OnInit } from '@angular/core';
import { SummonerService } from '../../services/summoner.service';
import { FormsModule } from '@angular/forms';
import { Summoner } from '../../models/summoner';
import { CommonModule } from '@angular/common';
import { TwitchService } from '../../services/twitch.service';
import { TwitchUser } from '../../models/twitch-user';
import { SpectatorService } from '../../services/spectator.service';
import { CurrentGame } from '../../models/current-game';
import { CurrentParticipant } from '../../models/current-participant';
import { MatchHistoryComponent } from "../match-history/match-history.component";
import { Match } from '../../models/match';
import { MatchService } from '../../services/match.service';

@Component({
  selector: 'app-main',
  imports: [FormsModule, CommonModule, MatchHistoryComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit{
  
  private summonerService = inject(SummonerService);
  private twitchService = inject(TwitchService);
  private spectatorService = inject(SpectatorService);
  private matchService = inject(MatchService);

  profiles = [
    {
      server: "LAN",
      region: "americas",
      platform: "la1"
    },
    {
      server: "LAS",
      region: "americas",
      platform: "la2"
    },
    {
      server: "NA",
      region: "americas",
      platform: "na1"
    },
    {
      server: "EUW",
      region: "europe",
      platform: "euw1"
    }
  ]
  ddversion = "16.5.1";

  // twitch info
  twitchUserInfo: TwitchUser | null = null;
  isLoadingTwitchUser = false;
  errorTwitchUser: string | null = null;
  imgUrlTwitchUser = "";

  // Summoner info
  selectedServer: string = '';
  summonerInfo: Summoner | null = null;
  isLoading = false;
  error: string | null = null;
  imgUrl = "";

  // Current game info
  currentGame: CurrentGame | null = null;
  isLoadingCurrentGame = false;
  errorCurrentGame: string | null = null;
  currentGameTeam1: CurrentParticipant[] | null = null;
  currentGameTeam2: CurrentParticipant[] | null = null;

  matches: Match[] = [];
  mainPuuid: string = "";
  

  ngOnInit(): void {
    this.isLive("caresapo");
    this.getCurrentGame();
  }

  getCurrentGame(){
    this.isLoadingCurrentGame = true;
    this.currentGame = null;
    this.errorCurrentGame = null;

    this.spectatorService.getCurrentGame().subscribe({
      next: (info) => {
        this.currentGame = info;
        this.isLoadingCurrentGame = false;

        this.currentGameTeam1 = this.currentGame.participants
          .filter((p) => p.teamId == 100);

        this.currentGameTeam2 = this.currentGame.participants
          .filter((p) => p.teamId == 200);
      },
      error: (err) => {
        this.errorCurrentGame = 'Error al obtener info del servidor';
        this.isLoadingCurrentGame = false;
      }
    });
  }

  isLive(username: string) {

    this.isLoadingTwitchUser = true;
    this.twitchUserInfo = null;
    this.errorTwitchUser = null;

    this.twitchService.isLive(username).subscribe({
      next: (info) => {
        this.twitchUserInfo = info;
        this.isLoadingTwitchUser = false;
        this.imgUrlTwitchUser = this.twitchUserInfo.profile_image_url;
      },
      error: (err) => {
        this.errorTwitchUser = 'Error al obtener info del servidor';
        this.isLoadingTwitchUser = false;
      }
    });
  }

  onServerChange(server: string): void {
    if (!server) return;

    this.isLoading = true;
    this.summonerInfo = null;
    this.error = null;

    this.summonerService.getSummoner(server).subscribe({
      next: (info) => {
        this.summonerInfo = info;
        this.mainPuuid = this.summonerInfo.puuid;
        this.isLoading = false;
        this.imgUrl = `https://ddragon.leagueoflegends.com/cdn/${this.ddversion}/img/profileicon/${this.summonerInfo.profileIconId}.png`;
      },
      error: (err) => {
        this.error = 'Error al obtener info del servidor';
        this.isLoading = false;
      }
    });

    this.matchService.getMatches(server).subscribe({
      next: (info) => {
        this.matches = info;
      },
      error: (err) => {
        console.log(err)
      }
    });
  }

  activeTab = 0;

  selectTab(index: number) {
    this.activeTab = index;
  }

}
