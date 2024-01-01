export interface IHomeCrewRanking {
  name: string;
  captain: string;
  level: number;
  members: number;
  type: HomeRankingType;
}

export interface IHomePlayerRanking {
  name: string;
  crewName: string;
  level: number;
  reputation: number;
  type: HomeRankingType;
}

export type HomeRankingType = 'pirate' | 'marine' | 'revolutionary';
