import images from '@/data/imageData';

interface AvatarImages {
  [id: number]: {
    [mini: number]: string;
  };
}

const avatarMiniImageMap: AvatarImages = {
  1: { 1: images.avatarHannyabalMini1Image, 2: images.avatarHannyabalMini2Image },
  2: { 1: images.avatarAokijiMini1Image },
  3: { 1: images.avatarBennBeckmanMini1Image },
  4: { 1: images.avatarZephyrMini1Image },
  5: { 1: images.avatarCharlottePerosperoMini1Image }
};

export const getAvatarImageMini = (id: number, avatar: number): string => {
  if (avatarMiniImageMap[id] && avatarMiniImageMap[id][avatar]) {
    return avatarMiniImageMap[id][avatar];
  }
  return '';
};

const avatarBattleImageMap: AvatarImages = {
  1: { 1: images.avatarHannyabalBattle1Image, 2: images.avatarHannyabalBattle2Image },
  2: { 1: images.avatarAokijiBattle1Image },
  3: { 1: images.avatarBennBeckmanBattle1Image },
  4: { 1: images.avatarZephyrBattle1Image },
  5: { 1: images.avatarCharlottePerosperoBattle1Image }
};

export const getAvatarImageBattle = (id: number, avatar: number): string => {
  if (avatarBattleImageMap[id] && avatarBattleImageMap[id][avatar]) {
    return avatarBattleImageMap[id][avatar];
  }
  return '';
};
