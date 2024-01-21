<template>
  <div>
    <div class="sidebar" :style="{ backgroundImage: `url(${images.sidebarContentImage})` }">
      <div class="sidebar-top" :style="{ backgroundImage: `url(${images.sidebarTopImage})` }"></div>
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
                  width: `${calculateWidthForPercentage(calculatePercentage(hp, hpMax), 123)}px`
                }"
              >
                <div
                  class="sidebar-stats-bar"
                  :style="{ backgroundImage: `url(${images.sidebarStatsBarImage})` }"
                ></div>
              </div>
            </div>
            <img :src="images.iconStatsHpImage" alt="stats hp image" height="12" />
            <span>{{ calculatePercentage(hp, hpMax) }}%</span>
          </div>
          <template #content><b>HP:</b> {{ hp }} de {{ hpMax }}</template>
        </PopperComponent>
        <PopperComponent arrow hover placement="right">
          <div
            class="sidebar-stats-container is-flex is-justify-content-space-between is-align-items-center"
          >
            <div class="sidebar-stats-bar-container">
              <div
                class="sidebar-stats-mp"
                :style="{
                  width: `${calculateWidthForPercentage(calculatePercentage(mp, mpMax), 123)}px`
                }"
              >
                <div
                  class="sidebar-stats-bar"
                  :style="{ backgroundImage: `url(${images.sidebarStatsBarImage})` }"
                ></div>
              </div>
            </div>
            <img :src="images.iconStatsMpImage" alt="stats hp image" height="12" />
            <span>{{ calculatePercentage(mp, mpMax) }}%</span>
          </div>
          <template #content><b>MP:</b> {{ mp }} de {{ mpMax }}</template>
        </PopperComponent>
        <PopperComponent arrow hover placement="right">
          <div
            class="sidebar-stats-container is-flex is-justify-content-space-between is-align-items-center"
          >
            <div class="sidebar-stats-bar-container">
              <div
                class="sidebar-stats-stamina"
                :style="{
                  width: `${calculateWidthForPercentage(
                    calculatePercentage(stamina, staminaMax),
                    123
                  )}px`
                }"
              >
                <div
                  class="sidebar-stats-bar"
                  :style="{ backgroundImage: `url(${images.sidebarStatsBarImage})` }"
                ></div>
              </div>
            </div>
            <img :src="images.iconStatsStaminaImage" alt="stats hp image" height="12" />
            <span>{{ stamina }}/{{ staminaMax }}</span>
          </div>
          <template #content
            >STAMINA<br />Seus pontos de stamina são utilizados toda vez que se inicia uma batalha,
            para cada batalha se utiliza 1 ponto. Ao acabar esses pontos você não poderá mais
            batalhar.<br />
            A cada 4 minutos se regenera 1 ponto automaticamente.<br />
            Para jogadores VIP, a stamina se regenera 2 pontos a cada 4 minutos.</template
          >
        </PopperComponent>
      </div>
      <div v-for="(menu, index) in menus" :key="index">
        <div class="sidebar-title" :style="{ backgroundImage: `url(${images.sidebarTitleImage})` }">
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
    <EventBoxComponent />
  </div>
</template>

<script setup lang="ts">
import images from '@/data/imageData';
import { calculateWidthForPercentage, calculatePercentage, handleNavigation } from '@/utils/utils';
import { ref } from 'vue';
import EventBoxComponent from './EventBoxComponent.vue';

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

defineProps({
  hp: {
    type: Number,
    required: true
  },
  hpMax: {
    type: Number,
    required: true
  },
  mp: {
    type: Number,
    required: true
  },
  mpMax: {
    type: Number,
    required: true
  },
  stamina: {
    type: Number,
    required: true
  },
  staminaMax: {
    type: Number,
    required: true
  }
});
</script>

<style scoped>
.sidebar {
  width: 211px;
  background-repeat: repeat-y;
  margin: 0 8px 0 3px;
  padding: 0 1px;
  float: left;
}

.sidebar-top {
  width: 209px;
  height: 23px;
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
