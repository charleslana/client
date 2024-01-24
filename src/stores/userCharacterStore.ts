import UserCharacterBreedEnum from '@/enum/UserCharacterBreedEnum';
import UserCharacterClassEnum from '@/enum/UserCharacterClassEnum';
import UserCharacterFactionEnum from '@/enum/UserCharacterFactionEnum';
import UserCharacterSeaEnum from '@/enum/UserCharacterSeaEnum';
import { defineStore } from 'pinia';
import type { IUserCharacter } from '@/interface/IUserCharacter';

export const userCharacterStore = defineStore('userCharacter', {
  state: (): { userCharacter: IUserCharacter } => ({
    userCharacter: {
      avatar: 1,
      breed: UserCharacterBreedEnum.Human,
      characterId: 1,
      class: UserCharacterClassEnum.Swordsman,
      coin: 0,
      experience: 0,
      experienceMax: 0,
      faction: UserCharacterFactionEnum.Pirate,
      hp: 0,
      hpMax: 0,
      id: '',
      level: 1,
      mp: 0,
      mpMax: 0,
      name: 'Test',
      score: 0,
      sea: UserCharacterSeaEnum.East,
      stamina: 0,
      staminaMax: 0,
      character: {
        id: 1,
        name: '',
        avatarMax: 1
      },
      user: {
        credit: 0,
        vip: null,
        fullName: ''
      }
    }
  }),
  actions: {
    saveUserCharacter(userCharacter: IUserCharacter): void {
      this.userCharacter = userCharacter;
    },
    saveAvatar(avatar: number): void {
      this.userCharacter.avatar = avatar;
    }
  }
});
