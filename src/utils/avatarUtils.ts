import images from '@/data/imageData';

interface AvatarImages {
  [id: number]: {
    [mini: number]: string;
  };
}

const avatarMiniImageMap: AvatarImages = {
  1: {
    1: images.avatarHannyabalMini1Image,
    2: images.avatarHannyabalMini2Image,
    3: images.avatarHannyabalMini3Image,
    4: images.avatarHannyabalMini4Image,
    5: images.avatarHannyabalMini5Image,
    6: images.avatarHannyabalMini6Image,
    7: images.avatarHannyabalMini7Image,
    8: images.avatarHannyabalMini8Image,
    9: images.avatarHannyabalMini9Image,
    10: images.avatarHannyabalMini10Image
  },
  2: {
    1: images.avatarAokijiMini1Image,
    2: images.avatarAokijiMini2Image,
    3: images.avatarAokijiMini3Image,
    4: images.avatarAokijiMini4Image,
    5: images.avatarAokijiMini5Image,
    6: images.avatarAokijiMini6Image,
    7: images.avatarAokijiMini7Image,
    8: images.avatarAokijiMini8Image,
    9: images.avatarAokijiMini9Image,
    10: images.avatarAokijiMini10Image,
    11: images.avatarAokijiMini11Image,
    12: images.avatarAokijiMini12Image,
    13: images.avatarAokijiMini13Image,
    14: images.avatarAokijiMini14Image,
    15: images.avatarAokijiMini15Image,
    16: images.avatarAokijiMini16Image,
    17: images.avatarAokijiMini17Image,
    18: images.avatarAokijiMini18Image,
    19: images.avatarAokijiMini19Image,
    20: images.avatarAokijiMini20Image,
    21: images.avatarAokijiMini21Image,
    22: images.avatarAokijiMini22Image,
    23: images.avatarAokijiMini23Image,
    24: images.avatarAokijiMini24Image,
    25: images.avatarAokijiMini25Image,
    99: images.avatarAokijiMiniSpecialImage
  },
  3: {
    1: images.avatarBennBeckmanMini1Image,
    2: images.avatarBennBeckmanMini2Image,
    3: images.avatarBennBeckmanMini3Image,
    4: images.avatarBennBeckmanMini4Image,
    5: images.avatarBennBeckmanMini5Image,
    6: images.avatarBennBeckmanMini6Image,
    7: images.avatarBennBeckmanMini7Image,
    8: images.avatarBennBeckmanMini8Image,
    9: images.avatarBennBeckmanMini9Image,
    10: images.avatarBennBeckmanMini10Image
  },
  4: {
    1: images.avatarZephyrMini1Image,
    2: images.avatarZephyrMini2Image,
    3: images.avatarZephyrMini3Image,
    4: images.avatarZephyrMini4Image,
    5: images.avatarZephyrMini5Image,
    6: images.avatarZephyrMini6Image,
    7: images.avatarZephyrMini7Image,
    8: images.avatarZephyrMini8Image,
    9: images.avatarZephyrMini9Image
  },
  5: {
    1: images.avatarCharlottePerosperoMini1Image,
    2: images.avatarCharlottePerosperoMini2Image,
    3: images.avatarCharlottePerosperoMini3Image,
    4: images.avatarCharlottePerosperoMini4Image,
    5: images.avatarCharlottePerosperoMini5Image,
    6: images.avatarCharlottePerosperoMini6Image,
    7: images.avatarCharlottePerosperoMini7Image,
    8: images.avatarCharlottePerosperoMini8Image
  }
};

export const getAvatarImageMini = (id: number, avatar: number): string => {
  if (avatarMiniImageMap[id] && avatarMiniImageMap[id][avatar]) {
    return avatarMiniImageMap[id][avatar];
  }
  return '';
};

const avatarBattleImageMap: AvatarImages = {
  1: {
    1: images.avatarHannyabalBattle1Image,
    2: images.avatarHannyabalBattle2Image,
    3: images.avatarHannyabalBattle3Image,
    4: images.avatarHannyabalBattle4Image,
    5: images.avatarHannyabalBattle5Image,
    6: images.avatarHannyabalBattle6Image,
    7: images.avatarHannyabalBattle7Image,
    8: images.avatarHannyabalBattle8Image,
    9: images.avatarHannyabalBattle9Image,
    10: images.avatarHannyabalBattle10Image
  },
  2: {
    1: images.avatarAokijiBattle1Image,
    2: images.avatarAokijiBattle2Image,
    3: images.avatarAokijiBattle3Image,
    4: images.avatarAokijiBattle4Image,
    5: images.avatarAokijiBattle5Image,
    6: images.avatarAokijiBattle6Image,
    7: images.avatarAokijiBattle7Image,
    8: images.avatarAokijiBattle8Image,
    9: images.avatarAokijiBattle9Image,
    10: images.avatarAokijiBattle10Image,
    11: images.avatarAokijiBattle11Image,
    12: images.avatarAokijiBattle12Image,
    13: images.avatarAokijiBattle13Image,
    14: images.avatarAokijiBattle14Image,
    15: images.avatarAokijiBattle15Image,
    16: images.avatarAokijiBattle16Image,
    17: images.avatarAokijiBattle17Image,
    18: images.avatarAokijiBattle18Image,
    19: images.avatarAokijiBattle19Image,
    20: images.avatarAokijiBattle20Image,
    21: images.avatarAokijiBattle21Image,
    22: images.avatarAokijiBattle22Image,
    23: images.avatarAokijiBattle23Image,
    24: images.avatarAokijiBattle24Image,
    25: images.avatarAokijiBattle25Image,
    99: images.avatarAokijiBattleSpecialImage
  },
  3: {
    1: images.avatarBennBeckmanBattle1Image,
    2: images.avatarBennBeckmanBattle2Image,
    3: images.avatarBennBeckmanBattle3Image,
    4: images.avatarBennBeckmanBattle4Image,
    5: images.avatarBennBeckmanBattle5Image,
    6: images.avatarBennBeckmanBattle6Image,
    7: images.avatarBennBeckmanBattle7Image,
    8: images.avatarBennBeckmanBattle8Image,
    9: images.avatarBennBeckmanBattle9Image,
    10: images.avatarBennBeckmanBattle10Image
  },
  4: {
    1: images.avatarZephyrBattle1Image,
    2: images.avatarZephyrBattle2Image,
    3: images.avatarZephyrBattle3Image,
    4: images.avatarZephyrBattle4Image,
    5: images.avatarZephyrBattle5Image,
    6: images.avatarZephyrBattle6Image,
    7: images.avatarZephyrBattle7Image,
    8: images.avatarZephyrBattle8Image,
    9: images.avatarZephyrBattle9Image
  },
  5: {
    1: images.avatarCharlottePerosperoBattle1Image,
    2: images.avatarCharlottePerosperoBattle2Image,
    3: images.avatarCharlottePerosperoBattle3Image,
    4: images.avatarCharlottePerosperoBattle4Image,
    5: images.avatarCharlottePerosperoBattle5Image,
    6: images.avatarCharlottePerosperoBattle6Image,
    7: images.avatarCharlottePerosperoBattle7Image,
    8: images.avatarCharlottePerosperoBattle8Image
  }
};

export const getAvatarImageBattle = (id: number, avatar: number): string => {
  if (avatarBattleImageMap[id] && avatarBattleImageMap[id][avatar]) {
    return avatarBattleImageMap[id][avatar];
  }
  return '';
};

const avatarStatusImageMap: AvatarImages = {
  1: {
    1: images.avatarHannyabalStatus1Image,
    2: images.avatarHannyabalStatus2Image,
    3: images.avatarHannyabalStatus3Image,
    4: images.avatarHannyabalStatus4Image,
    5: images.avatarHannyabalStatus5Image,
    6: images.avatarHannyabalStatus6Image,
    7: images.avatarHannyabalStatus7Image,
    8: images.avatarHannyabalStatus8Image,
    9: images.avatarHannyabalStatus9Image,
    10: images.avatarHannyabalStatus10Image
  },
  2: {
    1: images.avatarAokijiStatus1Image,
    2: images.avatarAokijiStatus2Image,
    3: images.avatarAokijiStatus3Image,
    4: images.avatarAokijiStatus4Image,
    5: images.avatarAokijiStatus5Image,
    6: images.avatarAokijiStatus6Image,
    7: images.avatarAokijiStatus7Image,
    8: images.avatarAokijiStatus8Image,
    9: images.avatarAokijiStatus9Image,
    10: images.avatarAokijiStatus10Image,
    11: images.avatarAokijiStatus11Image,
    12: images.avatarAokijiStatus12Image,
    13: images.avatarAokijiStatus13Image,
    14: images.avatarAokijiStatus14Image,
    15: images.avatarAokijiStatus15Image,
    16: images.avatarAokijiStatus16Image,
    17: images.avatarAokijiStatus17Image,
    18: images.avatarAokijiStatus18Image,
    19: images.avatarAokijiStatus19Image,
    20: images.avatarAokijiStatus20Image,
    21: images.avatarAokijiStatus21Image,
    22: images.avatarAokijiStatus22Image,
    23: images.avatarAokijiStatus23Image,
    24: images.avatarAokijiStatus24Image,
    25: images.avatarAokijiStatus25Image,
    99: images.avatarAokijiStatusSpecialImage
  },
  3: {
    1: images.avatarBennBeckmanStatus1Image,
    2: images.avatarBennBeckmanStatus2Image,
    3: images.avatarBennBeckmanStatus3Image,
    4: images.avatarBennBeckmanStatus4Image,
    5: images.avatarBennBeckmanStatus5Image,
    6: images.avatarBennBeckmanStatus6Image,
    7: images.avatarBennBeckmanStatus7Image,
    8: images.avatarBennBeckmanStatus8Image,
    9: images.avatarBennBeckmanStatus9Image,
    10: images.avatarBennBeckmanStatus10Image
  },
  4: {
    1: images.avatarZephyrStatus1Image,
    2: images.avatarZephyrStatus2Image,
    3: images.avatarZephyrStatus3Image,
    4: images.avatarZephyrStatus4Image,
    5: images.avatarZephyrStatus5Image,
    6: images.avatarZephyrStatus6Image,
    7: images.avatarZephyrStatus7Image,
    8: images.avatarZephyrStatus8Image,
    9: images.avatarZephyrStatus9Image
  },
  5: {
    1: images.avatarCharlottePerosperoStatus1Image,
    2: images.avatarCharlottePerosperoStatus2Image,
    3: images.avatarCharlottePerosperoStatus3Image,
    4: images.avatarCharlottePerosperoStatus4Image,
    5: images.avatarCharlottePerosperoStatus5Image,
    6: images.avatarCharlottePerosperoStatus6Image,
    7: images.avatarCharlottePerosperoStatus7Image,
    8: images.avatarCharlottePerosperoStatus8Image
  }
};

export const getAvatarImageStatus = (id: number, avatar: number): string => {
  if (avatarStatusImageMap[id] && avatarStatusImageMap[id][avatar]) {
    return avatarStatusImageMap[id][avatar];
  }
  return '';
};
