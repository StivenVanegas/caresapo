import { Component, Input } from '@angular/core';
import { Match, Participant } from '../../models/match';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-match-history',
  imports: [FormsModule, CommonModule],
  templateUrl: './match-history.component.html',
  styleUrl: './match-history.component.css'
})
export class MatchHistoryComponent {

  @Input() matches: Match[] = [];
  @Input() summonerPuuid!: string;

  getPlayer(match: Match): Participant | undefined {
    return match.info.participants.find(
      p => p.puuid.toLowerCase() === this.summonerPuuid.toLowerCase()
    );
  }

  // Los primeros 5 participantes son equipo azul (100), los últimos 5 equipo rojo (200)
  // El campo teamId no siempre viene del backend, así que usamos índice
  getTeam(match: Match, teamId: number): Participant[] {
    const participants = match.info.participants;

    // Si el primer participante tiene teamId, usarlo directamente
    if (participants[0]?.teamId) {
      return participants.filter(p => p.teamId === teamId);
    }

    // Fallback: primeros 5 = azul (100), últimos 5 = rojo (200)
    return teamId === 100
      ? participants.slice(0, 5)
      : participants.slice(5, 10);
  }

  getItems(player: Participant): number[] {
    return [
      player.item0, player.item1, player.item2,
      player.item3, player.item4, player.item5, player.item6
    ];
  }

  getItemUrl(itemId: number): string {
    return `https://ddragon.leagueoflegends.com/cdn/16.5.1/img/item/${itemId}.png`;
  }

  getOtherPlayers(match: Match): Participant[] {
    return match.info.participants.filter(
      p => p.puuid.toLowerCase() !== this.summonerPuuid.toLowerCase()
    );
  }

  getParticipantsOrdered(match: Match): Participant[] {
    return [...match.info.participants].sort((a, b) => (a.teamId ?? 0) - (b.teamId ?? 0));
  }

}