export interface Match {
  info: {
    participants: Participant[];
  };
}

export interface Participant {
  assists: number;
  championId: number;
  championName: string;
  deaths: number;
  kills: number;
  puuid: string;
  riotIdGameName: string;
  riotIdTagline: string;
  win: boolean;
  championImageUrl: string;
  teamId: number;
  item0: number;
	item1: number;
	item2: number;
	item3: number;
	item4: number;
	item5: number;
	item6: number;
	
	summoner1Id: number;
	summoner2Id: number;
	
	summoner1Img: string;
	summoner2Img: string;
  
}