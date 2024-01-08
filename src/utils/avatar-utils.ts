import images from '@/data/imageData';

export const getAvatarImageMini = (id: number): string => {
  switch (id) {
    case 1:
      return images.avatarHannyabalMiniImage;
    default:
      return '';
  }
};
