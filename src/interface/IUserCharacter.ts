import type UserCharacterBreedEnum from '@/enum/UserCharacterBreedEnum';
import type UserCharacterClassEnum from '@/enum/UserCharacterClassEnum';
import type UserCharacterFactionEnum from '@/enum/UserCharacterFactionEnum';
import type UserCharacterSeaEnum from '@/enum/UserCharacterSeaEnum';
import type { IUser } from './IUser';
import type { ICharacter } from './ICharacter';

export interface IUserCharacter {
  id: string;
  name: string;
  level: number;
  characterId: number;
  faction: UserCharacterFactionEnum;
  experienceMax: number;
  hpMax: number;
  mpMax: number;
  staminaMax: number;
  sea: UserCharacterSeaEnum;
  breed: UserCharacterBreedEnum;
  class: UserCharacterClassEnum;
  avatar: number;
  coin: number;
  experience: number;
  hp: number;
  mp: number;
  stamina: number;
  score: number;
  character: ICharacter;
  user: IUser;
}

export interface ICreateUserCharacter {
  characterId: number;
  name: string;
  faction: UserCharacterFactionEnum;
  sea: UserCharacterSeaEnum;
  breed: UserCharacterBreedEnum;
  class: UserCharacterClassEnum;
}
