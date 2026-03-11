import { CurrentParticipant } from "./current-participant";

export interface CurrentGame{
    gameId: number;
	gameType: string;
	gameStartTime: number;
	mapId: number;
	gameLength: number;
	platformId: string;
	gameMode: string;
	//private bannedChampions;
	gameQueueConfigId: number;
	participants: CurrentParticipant[];
}