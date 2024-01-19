import UserCharacterClassEnum from '@/enum/UserCharacterClassEnum';

export const getClass = (_class: UserCharacterClassEnum): string => {
  switch (_class) {
    case UserCharacterClassEnum.Swordsman:
      return 'Espadachim';
    case UserCharacterClassEnum.Shooter:
      return 'Atirador';
    case UserCharacterClassEnum.Fighter:
      return 'Lutador';
    default:
      return '';
  }
};
