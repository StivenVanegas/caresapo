import { League } from "./league";

export interface Summoner {
    puuid: string;
    gameName: string;
    tagLine: string;
    profileIconId: number;
	summonerLevel: number;
    leagues:League[];
}
