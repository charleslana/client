<template>
  <div>
    <header class="header" :style="{ backgroundImage: `url(${images.headerImage})` }">
      <div class="user-header-bg" :style="{ backgroundImage: `url(${images.userHeaderBgImage})` }">
        <div class="coin-icon is-flex">
          <img :src="images.coinImage" alt="coin image" class="mr-2" />
          <p>Berries: {{ formatNumberWithZero(userCharacter.coin) }}</p>
        </div>
        <div class="avatar">
          <PopperComponent arrow content="Clique aqui pra trocar de avatar" hover placement="right">
            <img
              :src="getAvatarImageBattle(userCharacter.characterId, userCharacter.avatar)"
              alt="avatar image"
              class="is-clickable"
              @click="null"
            />
          </PopperComponent>
        </div>
        <div class="user-info">
          <div class="user-name">{{ userCharacter.name }}</div>
          <div class="user-class">{{ getClass(userCharacter.class) }}</div>
          <PopperComponent arrow hover placement="right">
            <div class="user-info-bar">
              <div
                class="fill"
                :style="{
                  width: `${calculateWidthForPercentage(
                    calculatePercentage(userCharacter.experience, userCharacter.experienceMax),
                    123
                  )}px`
                }"
              >
                <div
                  class="user-info-bar-mask"
                  :style="{ backgroundImage: `url(${images.userInfoBarImage})` }"
                >
                  {{ calculatePercentage(userCharacter.experience, userCharacter.experienceMax) }}%
                </div>
              </div>
            </div>
            <template #content
              ><b>EXPERIÊNCIA:</b> {{ userCharacter.experience }} de
              {{ userCharacter.experienceMax }}</template
            >
          </PopperComponent>
          <div class="user-credit-box is-flex is-align-items-center">
            <img :src="images.creditImage" alt="credit image" class="mr-1" />
            <div class="user-credit-text mr-1">Créditos:</div>
            <div class="user-credit">{{ formatNumber(userCharacter.user.credit) }}</div>
          </div>
        </div>
        <div
          class="user-level-info"
          :style="{ backgroundImage: `url(${images.userInfoLevelImage})` }"
        >
          <div class="user-level-text">Nível</div>
          <div class="user-level">{{ userCharacter.level }}</div>
        </div>
      </div>
      <div class="nav-bar" :style="{ backgroundImage: `url(${images.navBarImage})` }">
        <img :src="images.logoHeaderImage" alt="logo image" class="logo-header" />
        <div class="nav-bar-item is-flex">
          <div
            v-for="(navItem, index) in navItems"
            :key="index"
            class="nav-bar-item-info is-flex is-flex-direction-column is-justify-content-center is-align-items-center"
            :style="{
              borderImageSource: navItem.isBorderEnabled ? `url(${images.navBorderImage})` : 'none'
            }"
            @mouseover="enableBorder(index)"
            @mouseleave="disableBorder(index)"
            @click="handleNavigation(navItem.route)"
          >
            <img :src="navItem.image" :alt="navItem.alt" height="22" />
            <p class="nav-bar-item-text">{{ navItem.text }}</p>
          </div>
        </div>
        <div class="menu-online" :style="{ backgroundImage: `url(${images.menuOnlineImage})` }">
          <div class="menu-online-icon">
            <PopperComponent arrow content="Trocar de personagem" hover placement="top">
              <a @click="handleNavigation('change-character')">
                <img
                  :src="images.changeCharacterImage"
                  alt="change character image"
                  class="mr-1 is-clickable"
                />
              </a>
            </PopperComponent>
            <PopperComponent arrow hover placement="right" v-if="isVip(userCharacter.user.vip)">
              <img :src="images.vipImage" alt="vip image" />
              <template #content>
                <p>
                  VIP<br />Seu vip acaba em {{ formatDateToDateTime(userCharacter.user.vip!)
                  }}<br />Restam <b>{{ timeRemaining }}</b> até o fim do seu VIP
                </p>
              </template>
            </PopperComponent>
          </div>
          <div class="menu-online-link">
            <RouterLink to="/support">Suporte</RouterLink>
            <RouterLink to="/profile">Perfil</RouterLink>
            <a @click="logout">Desconectar</a>
          </div>
        </div>
      </div>
    </header>
    <SidebarComponent
      :hp="userCharacter.hp"
      :hp-max="userCharacter.hpMax"
      :mp="userCharacter.mp"
      :mp-max="userCharacter.mpMax"
      :stamina="userCharacter.stamina"
      :stamina-max="userCharacter.staminaMax"
    />
  </div>
</template>

<script setup lang="ts">
import images from '@/data/imageData';
import SidebarComponent from '@/components/SidebarComponent.vue';
import { getAvatarImageBattle } from '@/utils/avatarUtils';
import { getClass } from '@/utils/userCharacterUtils';
import {
  formatNumberWithZero,
  calculateWidthForPercentage,
  calculatePercentage,
  formatNumber,
  handleNavigation,
  formatDateToDateTime,
  calculateTimeRemaining,
  isVip
} from '@/utils/utils';
import { onBeforeUnmount, onMounted, ref } from 'vue';
import type { IUserCharacter } from '@/interface/IUserCharacter';
import UserCharacterService from '@/service/UserCharacterService';
import UserCharacterBreedEnum from '@/enum/UserCharacterBreedEnum';
import UserCharacterClassEnum from '@/enum/UserCharacterClassEnum';
import UserCharacterFactionEnum from '@/enum/UserCharacterFactionEnum';
import UserCharacterSeaEnum from '@/enum/UserCharacterSeaEnum';

const navItems = ref([
  {
    image: images.chatNavBarImage,
    alt: 'chat image',
    text: 'Chat',
    isBorderEnabled: false,
    route: 'https://discord.com'
  },
  {
    image: images.islandNavBarImage,
    alt: 'island image',
    text: 'Ilha',
    isBorderEnabled: false,
    route: 'island'
  },
  {
    image: images.hospitalNavBarImage,
    alt: 'hospital image',
    text: 'Hospital',
    isBorderEnabled: false,
    route: 'hospital'
  },
  {
    image: images.marketplaceNavBarImage,
    alt: 'marketplace image',
    text: 'Mercado',
    isBorderEnabled: false,
    route: 'marketplace'
  },
  {
    image: images.backpackNavBarImage,
    alt: 'backpack image',
    text: 'Mochila',
    isBorderEnabled: false,
    route: 'backpack'
  },
  {
    image: images.shopNavBarImage,
    alt: 'shop image',
    text: 'Shop',
    isBorderEnabled: false,
    route: 'shop'
  },
  {
    image: images.workNavBarImage,
    alt: 'work image',
    text: 'Trabalhos',
    isBorderEnabled: false,
    route: 'work'
  },
  {
    image: images.trainingNavBarImage,
    alt: 'training image',
    text: 'Treino',
    isBorderEnabled: false,
    route: 'training'
  },
  {
    image: images.crewNavBarImage,
    alt: 'crew image',
    text: 'Trip',
    isBorderEnabled: false,
    route: 'crew'
  }
]);
const userCharacter = ref<IUserCharacter>({
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
});
const timeRemaining = ref(calculateTimeRemaining(new Date().toISOString()));
let timerId: ReturnType<typeof setInterval> | null = null;

onMounted(() => {
  getUserCharacterAPI();
});

onBeforeUnmount(() => {
  if (timerId) {
    clearInterval(timerId);
  }
});

const enableBorder = (index: number): void => {
  navItems.value[index].isBorderEnabled = true;
};

const disableBorder = (index: number): void => {
  navItems.value[index].isBorderEnabled = false;
};

const logout = (): void => {
  handleNavigation('logout');
};

async function getUserCharacterAPI(): Promise<void> {
  try {
    const getUserCharacter = await UserCharacterService.getMe();
    userCharacter.value = getUserCharacter;
    if (isVip(userCharacter.value.user.vip)) {
      countdown(userCharacter.value.user.vip!);
    }
  } catch (err: unknown) {
    //
  } finally {
    //
  }
}

function countdown(vip: string): void {
  timerId = setInterval(() => {
    timeRemaining.value = calculateTimeRemaining(vip!);
  }, 1000);
}
</script>

<style scoped>
.header {
  background-position: top center;
  background-repeat: no-repeat;
  width: 989px;
  height: 190px;
  position: relative;
}

.user-header-bg {
  width: 289px;
  height: 110px;
  background-repeat: no-repeat;
  position: absolute;
  right: 80px;
  top: 17px;
}

.coin-icon {
  width: 133px;
  height: 17px;
  position: absolute;
  left: 113px;
  top: 4px;
}

.coin-icon p {
  font-family: 'yanone_kaffeesatzregular';
  color: white;
  font-size: 14px;
  line-height: 18px;
}

.avatar {
  width: 54px;
  height: 54px;
  position: absolute;
  top: 25px;
  left: 36px;
}

.avatar img {
  width: 54px;
  height: 54px;
  border-radius: 15px;
  border: 1px solid #0b4769;
  box-shadow: 0 0 2px 0 rgb(11, 71, 105);
  object-fit: cover;
}

.user-info {
  width: 120px;
  height: 86px;
  position: absolute;
  top: 19px;
  left: 113px;
}

.user-name {
  font-family: 'yanone_kaffeesatzregular';
  color: #ffc66a;
  font-size: 24px;
  text-shadow: 0 1px 0px #0a5695;
  height: 28px;
}

.user-class {
  font-family: 'yanone_kaffeesatzregular';
  color: #fff;
  text-shadow: 0px 1px 0px #021d38;
  font-size: 14px;
  line-height: 17px;
}

.user-info-bar {
  width: 123px;
  height: 17px;
  background-color: #ededed;
}

.user-info-bar .fill {
  background: linear-gradient(to right, #41add2 0%, #046a8d 100%);
  width: 123px;
  height: 17px;
}

.user-info-bar-mask {
  font-size: 11px;
  color: #fff;
  text-shadow: 1px 1px 0px #000;
  padding: 1px 0 0 8px;
  width: 123px;
  height: 17px;
  background-repeat: no-repeat;
}

.user-level-info {
  width: 47px;
  height: 43px;
  background-repeat: no-repeat;
  position: absolute;
  right: 14px;
  bottom: 40px;
}

.user-level-text {
  font-family: 'yanone_kaffeesatzregular';
  font-size: 14px;
  color: #fff;
  text-shadow: 0px 1px 0px #4b5964;
  text-align: center;
}

.user-level {
  font-family: 'yanone_kaffeesatzregular';
  font-size: 30px;
  color: #fff;
  text-shadow: 0px 1px 0px #4b5964;
  position: absolute;
  top: 20px;
  left: 5px;
  width: 37px;
  height: 20px;
  line-height: 20px;
  text-align: center;
}

.user-credit-box {
  height: 17px;
}

.user-credit-text {
  font-family: 'yanone_kaffeesatzregular';
  font-size: 12px;
  color: #d7d7d7;
}

.user-credit {
  font-family: 'yanone_kaffeesatzregular';
  color: #ffffff;
  font-size: 16px;
}

.nav-bar {
  width: 777px;
  height: 73px;
  background-repeat: no-repeat;
  position: absolute;
  top: 127px;
  z-index: 1;
}

.logo-header {
  position: absolute;
  top: -71px;
}

.nav-bar-item {
  width: 500px;
  height: 57px;
  position: absolute;
  top: 8px;
  left: 209px;
}

.nav-bar-item-text {
  text-shadow: 1px 1px 0px #0b4769;
  font-family: 'mousememoirs';
  color: #ffc66a;
  font-size: 18px;
  height: 20px;
  line-height: 20px;
}

.nav-bar-item-info {
  padding: 10px 8px;
  border-image-slice: 1;
  border-image-width: 1;
  border-image-repeat: repeat;
  border-style: solid;
  border-width: 0px 1px;
  border-color: transparent;
  cursor: pointer;
  margin-right: 2px;
}

.nav-bar-item-info:hover {
  border-style: solid;
  border-width: 0px 1px;
  border-color: #ffc66a;
  box-shadow: inset 0px 0px 18px 10px rgba(0, 0, 0, 0.3);
}

.nav-bar-item-info img {
  max-width: none;
}

.menu-online {
  position: absolute;
  background-repeat: no-repeat;
  width: 260px;
  height: 84px;
  right: -215px;
  top: 3px;
}

.menu-online-icon {
  position: absolute;
  top: 11px;
  left: 50%;
  transform: translateX(-50%);
}

.menu-online-link {
  position: absolute;
  width: 150px;
  height: 15px;
  bottom: 10px;
  left: 71px;
}

.menu-online-link a {
  color: #1e1e1e;
  text-shadow: 1px 1px 0px #dcdcdc;
  font-size: 12px;
  margin-right: 5px;
}

.menu-online-link a:hover {
  text-decoration: underline;
}
</style>
