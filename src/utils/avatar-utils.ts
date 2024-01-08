import images from '@/data/imageData';

interface AvatarImages {
  [id: number]: {
    [mini: number]: string;
  };
}

const avatarImageMap: AvatarImages = {
  1: { 1: images.avatarHannyabalMini1Image, 2: images.avatarHannyabalMini2Image },
  2: { 1: images.avatarAokijiMini1Image },
  3: { 1: images.avatarBennBeckmanMini1Image },
  4: { 1: images.avatarZephyrMini1Image },
  5: { 1: images.avatarCharlottePerosperoMini1Image }
};

export const getAvatarImageMini = (id: number, mini: number): string => {
  if (avatarImageMap[id] && avatarImageMap[id][mini]) {
    return avatarImageMap[id][mini];
  }
  return '';
};
