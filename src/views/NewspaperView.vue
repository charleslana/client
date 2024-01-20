<template>
  <div
    class="bg"
    :style="{
      backgroundImage: `url(${images.layoutBgGrainImage}), url(${images.layoutBgCharacterImage}), linear-gradient(
          180deg,
          rgba(15, 23, 42, 1) 0%,
          rgba(30, 41, 59, 1) 35%,
          rgba(51, 65, 85, 1) 100%
        )`
    }"
  >
    <div class="container-wrapper">
      <header class="header" :style="{ backgroundImage: `url(${images.headerImage})` }">
        <div
          class="user-header-bg"
          :style="{ backgroundImage: `url(${images.userHeaderBgImage})` }"
        >
          <div class="coin-icon is-flex">
            <img :src="images.coinImage" alt="coin image" class="mr-2" />
            <p>Belly: {{ formatNumberWithZero(5500) }}</p>
          </div>
          <div class="avatar">
            <PopperComponent
              arrow
              content="Clique aqui pra trocar de avatar"
              hover
              placement="right"
            >
              <img
                :src="getAvatarImageBattle(1, 1)"
                alt="avatar image"
                class="is-clickable"
                @click="null"
              />
            </PopperComponent>
          </div>
          <div class="user-info">
            <div class="user-name">Test</div>
            <div class="user-class">{{ getClass(UserCharacterClassEnum.Swordsman) }}</div>
            <PopperComponent arrow hover placement="right">
              <div class="user-info-bar">
                <div class="fill" :style="{ width: `${calculateWidthForPercentage(50, 123)}px` }">
                  <div
                    class="user-info-bar-mask"
                    :style="{ backgroundImage: `url(${images.userInfoBarImage})` }"
                  >
                    50.00%
                  </div>
                </div>
              </div>
              <template #content><b>EXPERIÊNCIA:</b> 0 de 5</template>
            </PopperComponent>
            <div class="user-credit-box is-flex is-align-items-center">
              <img :src="images.creditImage" alt="credit image" class="mr-1" />
              <div class="user-credit-text mr-1">Créditos:</div>
              <div class="user-credit">{{ formatNumber(0) }}</div>
            </div>
          </div>
          <div
            class="user-level-info"
            :style="{ backgroundImage: `url(${images.userInfoLevelImage})` }"
          >
            <div class="user-level-text">Nível</div>
            <div class="user-level">1</div>
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
                borderImageSource: navItem.isBorderEnabled
                  ? `url(${images.navBorderImage})`
                  : 'none'
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
                <RouterLink to="/">
                  <img
                    :src="images.changeCharacterImage"
                    alt="change character image"
                    class="mr-1 is-clickable"
                  />
                </RouterLink>
              </PopperComponent>
              <PopperComponent arrow hover placement="right">
                <img :src="images.vipImage" alt="vip image" />
                <template #content>
                  <p>
                    VIP<br />Seu vip acaba em 20/01/2024 16:09<br />Restam <b>31:36:22</b> até o fim
                    do seu VIP
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
      <div class="sidebar" :style="{ backgroundImage: `url(${images.sidebarContentImage})` }">
        <div
          class="sidebar-top"
          :style="{ backgroundImage: `url(${images.sidebarTopImage})` }"
        ></div>
        <div class="sidebar-title" :style="{ backgroundImage: `url(${images.sidebarTitleImage})` }">
          Estatísticas
        </div>
        <div class="sidebar-stats" :style="{ backgroundImage: `url(${images.sidebarStatsImage})` }">
          <PopperComponent arrow hover placement="right">
            <div
              class="sidebar-stats-container is-flex is-justify-content-space-between is-align-items-center"
            >
              <div class="sidebar-stats-bar-container">
                <div
                  class="sidebar-stats-hp"
                  :style="{
                    width: `${calculateWidthForPercentage(calculatePercentage(65, 130), 123)}px`
                  }"
                >
                  <div
                    class="sidebar-stats-bar"
                    :style="{ backgroundImage: `url(${images.sidebarStatsBarImage})` }"
                  ></div>
                </div>
              </div>
              <img :src="images.iconStatsHpImage" alt="stats hp image" height="12" />
              <span>{{ calculatePercentage(65, 130) }}%</span>
            </div>
            <template #content><b>HP:</b> 65 de 130</template>
          </PopperComponent>
          <PopperComponent arrow hover placement="right">
            <div
              class="sidebar-stats-container is-flex is-justify-content-space-between is-align-items-center"
            >
              <div class="sidebar-stats-bar-container">
                <div
                  class="sidebar-stats-mp"
                  :style="{
                    width: `${calculateWidthForPercentage(calculatePercentage(160, 160), 123)}px`
                  }"
                >
                  <div
                    class="sidebar-stats-bar"
                    :style="{ backgroundImage: `url(${images.sidebarStatsBarImage})` }"
                  ></div>
                </div>
              </div>
              <img :src="images.iconStatsMpImage" alt="stats hp image" height="12" />
              <span>{{ calculatePercentage(160, 160) }}%</span>
            </div>
            <template #content><b>MP:</b> 160 de 160</template>
          </PopperComponent>
          <PopperComponent arrow hover placement="right">
            <div
              class="sidebar-stats-container is-flex is-justify-content-space-between is-align-items-center"
            >
              <div class="sidebar-stats-bar-container">
                <div
                  class="sidebar-stats-stamina"
                  :style="{
                    width: `${calculateWidthForPercentage(calculatePercentage(60, 60), 123)}px`
                  }"
                >
                  <div
                    class="sidebar-stats-bar"
                    :style="{ backgroundImage: `url(${images.sidebarStatsBarImage})` }"
                  ></div>
                </div>
              </div>
              <img :src="images.iconStatsStaminaImage" alt="stats hp image" height="12" />
              <span>60/60</span>
            </div>
            <template #content
              >STAMINA<br />Seus pontos de stamina são utilizados toda vez que se inicia uma
              batalha, para cada batalha se utiliza 1 ponto. Ao acabar esses pontos você não poderá
              mais batalhar.<br />
              A cada 4 minutos se regenera 1 ponto automaticamente.<br />
              Para jogadores VIP, a stamina se regenera 2 pontos a cada 4 minutos.</template
            >
          </PopperComponent>
        </div>
        <div v-for="(menu, index) in menus" :key="index">
          <div
            class="sidebar-title"
            :style="{ backgroundImage: `url(${images.sidebarTitleImage})` }"
          >
            {{ menu.title }}
          </div>
          <div
            class="sidebar-menu-bg"
            :style="{ backgroundImage: `url(${images.sidebarMenuBgImage})` }"
          >
            <div
              class="sidebar-menu-top"
              :style="{ backgroundImage: `url(${images.sidebarMenuTopImage})` }"
            ></div>
            <ul class="sidebar-menu-content">
              <li v-for="(link, linkIndex) in menu.links" :key="linkIndex">
                <a @click="handleNavigation(link.route)">
                  {{ link.title }}
                  <img v-if="link.new" :src="images.iconNewGifImage" alt="new image" />
                </a>
              </li>
            </ul>
            <div
              class="sidebar-menu-bottom"
              :style="{ backgroundImage: `url(${images.sidebarMenuBottomImage})` }"
            ></div>
          </div>
        </div>
        <div class="sidebar-title" :style="{ backgroundImage: `url(${images.sidebarTitleImage})` }">
          Ranking
        </div>
        <div
          class="sidebar-menu-bg"
          :style="{ backgroundImage: `url(${images.sidebarMenuBgImage})` }"
        >
          <div
            class="sidebar-menu-top"
            :style="{ backgroundImage: `url(${images.sidebarMenuTopImage})` }"
          ></div>
          <ul class="sidebar-menu-content">
            <li>
              <RouterLink to="/route">Avançados</RouterLink>
            </li>
            <li>
              <RouterLink to="/route">Jogadores</RouterLink>
            </li>
            <li>
              <RouterLink to="/route">Maestria</RouterLink>
            </li>
            <li>
              <RouterLink to="/route">Treinos</RouterLink>
            </li>
            <li>
              <RouterLink to="/route">Tripulação</RouterLink>
            </li>
          </ul>
          <div class="is-flex is-justify-content-center is-align-items-center">
            <input class="search-input" placeholder="Buscar jogador" />
            <button
              type="button"
              class="search-button"
              :style="{ backgroundImage: `url(${images.layoutBlueButton2Image})` }"
            >
              OK
            </button>
          </div>
          <div
            class="sidebar-menu-bottom"
            :style="{ backgroundImage: `url(${images.sidebarMenuBottomImage})` }"
          ></div>
        </div>
        <div
          class="sidebar-bottom"
          :style="{ backgroundImage: `url(${images.sidebarBottomImage})` }"
        ></div>
      </div>
      <ContainerComponent>
        <template v-slot:content>
          <h1 v-for="index in 10" :key="index">Lista</h1>
        </template>
      </ContainerComponent>
      <FooterComponent class="is-grid" />
      <div class="event-box-wrapper">
        <img
          :src="images.maxIconImage"
          alt="max icon image"
          class="is-clickable"
          @click="toggleEventBoxVisibility"
        />
        <transition name="animate">
          <div class="event-box animate" v-show="isEventBoxVisible">
            <p>Bônus de Experiência (x5) ativo em PvP e NPC, aproveite!</p>
            <strong>10:18:42</strong>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import images from '@/data/imageData';
import UserCharacterClassEnum from '@/enum/UserCharacterClassEnum';
import router from '@/router';
import { getAvatarImageBattle } from '@/utils/avatarUtils';
import { isEventBox, saveEventBox, removeToken } from '@/utils/localStorageUtils';
import { getClass } from '@/utils/userCharacterUtils';
import {
  formatNumberWithZero,
  calculateWidthForPercentage,
  formatNumber,
  calculatePercentage
} from '@/utils/utils';
import { ref } from 'vue';
import ContainerComponent from '@/components/ContainerComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';

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
const isEventBoxVisible = ref(isEventBox());
const menus = ref([
  {
    title: 'Principal',
    links: [
      { title: 'Início', route: 'newspaper', new: false },
      { title: 'Chat', route: 'http://discord.com', new: false },
      { title: 'Comprar Créditos', route: 'route', new: false },
      { title: 'Shopping', route: 'route', new: false },
      { title: 'Trocar de Personagem', route: 'route', new: false },
      { title: 'Vantagens VIP', route: 'route', new: false },
      { title: 'Desconectar', route: 'logout', new: false }
    ]
  },
  {
    title: 'Personagem',
    links: [
      { title: 'Akuma no Mi', route: 'route', new: true },
      { title: 'Aprender Golpes', route: 'route', new: false },
      { title: 'Aprimorar Golpes', route: 'route', new: false },
      { title: 'Buffs', route: 'route', new: false },
      { title: 'Maestrias', route: 'route', new: false },
      { title: 'Metas', route: 'route', new: true },
      { title: 'Mochila', route: 'route', new: false },
      { title: 'Modo História', route: 'route', new: false },
      { title: 'Passe VIP', route: 'route', new: true },
      { title: 'Status', route: 'route', new: false },
      { title: 'Tarefas Diárias', route: 'route', new: false },
      { title: 'Transformar', route: 'route', new: false },
      { title: 'Treinamento', route: 'route', new: false },
      { title: 'Tripulação', route: 'route', new: false }
    ]
  },
  {
    title: 'Batalhas',
    links: [
      { title: 'Ilha (NPCs)', route: 'route', new: false },
      { title: 'Battlesea (PvP)', route: 'route', new: false },
      { title: 'Boss', route: 'route', new: false },
      { title: 'Duelo', route: 'route', new: false },
      { title: 'Mapa Múndi', route: 'route', new: false },
      { title: 'Mar Aberto (PvP)', route: 'route', new: false },
      { title: 'Trabalhos', route: 'route', new: false }
    ]
  },
  {
    title: 'Cidade',
    links: [
      { title: 'Base', route: 'route', new: false },
      { title: 'Coliseu', route: 'route', new: false },
      { title: 'Conquista de Ilha', route: 'route', new: false },
      { title: 'Fábrica', route: 'route', new: false },
      { title: 'Hospital', route: 'route', new: false },
      { title: 'Usopp Factory', route: 'route', new: false },
      { title: 'Loja', route: 'route', new: false },
      { title: 'Mercado', route: 'route', new: false }
    ]
  },
  {
    title: 'Conta',
    links: [
      { title: 'Achados e Perdidos', route: 'route', new: false },
      { title: 'Administração de Conta', route: 'route', new: false },
      { title: 'Controle de Golpes', route: 'route', new: false },
      { title: 'Correio', route: 'route', new: false },
      { title: 'Meus Tickets', route: 'route', new: false },
      { title: 'Segurança', route: 'route', new: false },
      { title: 'Troca de Tickets', route: 'route', new: false }
    ]
  },
  {
    title: 'Infos e Ajuda',
    links: [
      { title: 'Blog', route: 'https://blog.com', new: false },
      { title: 'Discord', route: 'http://discord.com', new: false },
      { title: 'Drops do Passe', route: 'route', new: true },
      { title: 'Lista de Itens', route: 'route', new: false },
      { title: 'Lista de Drops', route: 'route', new: false },
      { title: 'Livro das Akumas', route: 'route', new: true },
      { title: 'Regras', route: 'route', new: false },
      { title: 'Relatórios de Drops', route: 'route', new: false },
      { title: 'Relatórios de Mar Aberto', route: 'route', new: false },
      { title: 'Relatórios de Metas', route: 'route', new: true },
      { title: 'Relatórios de PvPs', route: 'route', new: true },
      { title: 'Relatórios de Trip', route: 'route', new: true }
    ]
  }
]);

const enableBorder = (index: number): void => {
  navItems.value[index].isBorderEnabled = true;
};

const disableBorder = (index: number): void => {
  navItems.value[index].isBorderEnabled = false;
};

const handleNavigation = (destination: string): void => {
  if (destination.startsWith('http') || destination.startsWith('https')) {
    window.open(destination, '_blank');
  } else if (destination.includes('logout')) {
    logout();
  } else {
    router.push({ name: destination });
  }
};

const toggleEventBoxVisibility = (): void => {
  isEventBoxVisible.value = !isEventBoxVisible.value;
  saveEventBox(isEventBoxVisible.value.toString());
};

const logout = (): void => {
  removeToken();
  handleNavigation('home');
};
</script>

<style scoped>
.bg {
  background-position: top center;
  background-repeat: no-repeat;
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  position: relative;
}

.container-wrapper {
  margin: 0 auto;
  width: 989px;
  min-height: 100vh;
  position: relative;
}

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

.event-box-wrapper {
  position: absolute;
  bottom: 0px;
  left: 4px;
}

.event-box {
  background: linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(17, 38, 61, 1) 100%);
  box-shadow: 0 0px 3px 0 rgba(0, 0, 0, 0.7);
  padding: 8px 8px 8px 14px;
  width: 208px;
  text-align: center;
  line-height: 1.2;
}

.event-box p {
  font-size: 14px;
  font-family: 'myriadpro_cond';
  color: #ffffff;
  text-shadow: 0px 1px #3e0d07;
}

.event-box strong {
  font-family: 'myriadpro_cond';
  font-size: 14px;
  color: #555555;
}

.animate-enter-active,
.animate-leave-active {
  transition:
    width 0.5s ease-in-out,
    height 0.5s ease-in-out;
}

.animate-enter,
.animate-leave-to {
  width: 0;
  height: 0;
  overflow: hidden;
}

.animate-enter-active {
  width: 208px;
  height: auto;
}

.sidebar {
  width: 211px;
  background-repeat: repeat-y;
  margin: 0 8px 0 3px;
  padding: 0 1px;
  float: left;
}

.sidebar-top {
  width: 209px;
  height: 32px;
  background-repeat: no-repeat;
}

.sidebar-bottom {
  width: 209px;
  height: 21px;
  background-repeat: no-repeat;
  margin: 0 0 -6px -1px;
}

.sidebar-title {
  font-family: 'jollylodger';
  color: #303431;
  font-size: 30px;
  width: 209px;
  height: 39px;
  background-repeat: no-repeat;
  padding: 0 0 0 55px;
}

.sidebar-stats {
  width: 209px;
  padding: 10px;
  box-shadow: inset 0px 0px 11px 5px rgba(0, 0, 0, 0.3);
}

.sidebar-stats-container {
  width: 190px;
  border-radius: 6px;
  background-color: #f7f7f7;
  box-shadow: 0px 1px 0px 0px #a8a6a6;
  padding: 0px 5px 0px;
  text-align: right;
  margin-bottom: 4px;
}

.sidebar-stats-container img {
  height: fit-content;
}

.sidebar-stats-container span {
  font-family: 'yanone_kaffeesatzregular';
  color: #5d5e5d;
  font-size: 16px;
}

.sidebar-stats-bar-container {
  width: 123px;
}

.sidebar-stats-hp {
  background-color: #b94248;
  width: 123px;
  height: 17px;
}

.sidebar-stats-mp {
  background-color: #06c2d5;
  width: 123px;
  height: 17px;
}

.sidebar-stats-stamina {
  background-color: #efd351;
  width: 123px;
  height: 17px;
}

.sidebar-stats-bar {
  width: 123px;
  height: 17px;
  background-repeat: no-repeat;
}

.sidebar-menu-bg {
  width: 209px;
  background-repeat: repeat-y;
}

.sidebar-menu-top {
  width: 209px;
  height: 8px;
  background-repeat: no-repeat;
}

.sidebar-menu-content {
  padding: 0 6px;
}

.sidebar-menu-content li {
  line-height: 17px;
}

.sidebar-menu-content li a {
  font-size: 13px;
  color: #f8f8f8;
  text-shadow: 1px 1px 0px #075985;
  padding: 1px 10px;
  border-radius: 8px;
  display: block;
  width: 194px;
}

.sidebar-menu-content li a:before {
  color: #d3d3d3;
  font-size: 10px;
  text-shadow: 1px 1px 0px #0369a1;
  content: 'x';
  margin: 0 6px 0px 0;
  float: left;
  position: relative;
}

.sidebar-menu-content li a:hover:before {
  color: #06b6d4;
  font-size: 11px;
  text-shadow: 1px 1px 0px #d3d3d3;
}

.sidebar-menu-content li a:hover {
  background: linear-gradient(to bottom, #dedede 0%, #f7f7f7 100%);
  box-shadow: 0px 1px 0px 1px #06b6d4;
  color: #1f1f1f;
  text-shadow: 1px 1px 0px #c6c6c6;
  font-weight: bold;
}

.sidebar-menu-bottom {
  width: 209px;
  height: 8px;
  background-repeat: no-repeat;
  margin-top: 2px;
}

.search-input {
  width: 130px;
  font-size: 11px;
  height: 21px;
  border: 1px solid #eee;
  border-radius: 3px;
  padding: 3px;
  margin: 3px;
  background: #fff;
  color: #5b5958;
  font-family: 'myriad_pro_regular';
}

.search-button {
  font-family: yanone_kaffeesatzregular;
  width: 40px;
  height: 21px;
  margin-left: 3px;
  margin-top: 1px;
  font-size: 12px;
  background-repeat: no-repeat;
  background-position: top center;
  color: #fff;
  text-shadow: 1px 1px 0px #2d460c;
  text-align: center;
  border-radius: 4px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.6);
  cursor: pointer;
  line-height: 23px;
  padding: 0;
  border: none;
}
</style>
