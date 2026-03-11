export interface League{

    leagueId: string;
	queueType: string;
	tier: string;
	rank: string;
	puuid: string;
	leaguePoints: number;
	wins: number;
	losses: number;
	veteran: boolean;
	inactive: boolean;
	freshBlood: boolean;
	hotStreak: boolean;
}