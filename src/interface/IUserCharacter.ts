import type UserCharacterBreedEnum from '@/enum/UserCharacterBreedEnum';
import type UserCharacterClassEnum from '@/enum/UserCharacterClassEnum';
import type UserCharacterFactionEnum from '@/enum/UserCharacterFactionEnum';
import type UserCharacterSeaEnum from '@/enum/UserCharacterSeaEnum';

export interface IUserCharacter {
  id: string;
  name: string;
  level: number;
  characterId: number;
  faction: UserCharacterFactionEnum;
}

export interface ICreateUserCharacter {
  characterId: number;
  name: string;
  faction: UserCharacterFactionEnum;
  sea: UserCharacterSeaEnum;
  breed: UserCharacterBreedEnum;
  class: UserCharacterClassEnum;
}
