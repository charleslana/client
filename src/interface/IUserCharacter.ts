import type UserCharacterFactionEnum from '@/enum/UserCharacterFactionEnum';

export interface IUserCharacter {
  id: string;
  name: string;
  level: number;
  characterId: number;
  faction: UserCharacterFactionEnum;
}
