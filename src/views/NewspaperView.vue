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
      <HeaderComponent />
      <SidebarComponent />
      <ContainerComponent>
        <template v-slot:content>
          <div
            class="newspaper-box"
            :style="{ backgroundImage: `url(${images.newspaperBoxImage})` }"
          >
            <ul>
              <RouterLink
                v-for="(news, index) in newsList"
                :key="index"
                :to="`/newspaper/${news.id}`"
                class="news-link"
              >
                <li :style="{ backgroundImage: `url(${images.newspaperListImage})` }">
                  <div class="newspaper-box-date">{{ formatDateToDateOnly(news.date) }}</div>
                  <div class="newspaper-box-title">{{ news.title }}</div>
                </li>
              </RouterLink>
              <RouterLink to="/newspaper?page=2">
                <li :style="{ backgroundImage: `url(${images.newspaperListImage})` }">
                  <div class="newspaper-box-date">[+]</div>
                  <div class="newspaper-box-title">Ver mais notícias.</div>
                </li>
              </RouterLink>
            </ul>
          </div>
          <div class="title-bg" :style="{ backgroundImage: `url(${images.titleBgImage})` }">
            Próximos Eventos
          </div>
          <div class="title-bg" :style="{ backgroundImage: `url(${images.titleBgImage})` }">
            Ranking
          </div>
          <div
            class="top-players"
            :style="{ backgroundImage: `url(${images.topPlayersFactionImage})` }"
          >
            <div class="top-box-1">
              <ul>
                <li v-for="(pirate, index) in topPirates" :key="index">
                  <div class="avatar-players">
                    <img
                      :src="getAvatarImageMini(pirate.characterId, pirate.avatar)"
                      alt="avatar player image"
                    />
                  </div>
                  <div class="data-player">
                    <div class="username-player">{{ pirate.name }}</div>
                    <div class="username-level">Nível: {{ pirate.level }}</div>
                  </div>
                  <div class="top-icon" :style="{ backgroundImage: getTopIcon(index + 1) }">
                    {{ index + 1 }}
                  </div>
                </li>
              </ul>
            </div>
            <div class="top-box-2">
              <ul>
                <li v-for="(revolutionary, index) in topRevolutionaries" :key="index">
                  <div class="avatar-players">
                    <img
                      :src="getAvatarImageMini(revolutionary.characterId, revolutionary.avatar)"
                      alt="avatar player image"
                    />
                  </div>
                  <div class="data-player">
                    <div class="username-player">{{ revolutionary.name }}</div>
                    <div class="username-level">Nível: {{ revolutionary.level }}</div>
                  </div>
                  <div class="top-icon" :style="{ backgroundImage: getTopIcon(index + 1) }">
                    {{ index + 1 }}
                  </div>
                </li>
              </ul>
            </div>
            <div class="top-box-3">
              <ul>
                <li v-for="(marine, index) in topMarines" :key="index">
                  <div class="avatar-players">
                    <img
                      :src="getAvatarImageMini(marine.characterId, marine.avatar)"
                      alt="avatar player image"
                    />
                  </div>
                  <div class="data-player">
                    <div class="username-player">{{ marine.name }}</div>
                    <div class="username-level">Nível: {{ marine.level }}</div>
                  </div>
                  <div class="top-icon" :style="{ backgroundImage: getTopIcon(index + 1) }">
                    {{ index + 1 }}
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div
            class="top-players"
            :style="{ backgroundImage: `url(${images.topPlayersClassImage})` }"
          >
            <div class="top-box-1">
              <ul>
                <li v-for="(swordman, index) in topSwordsman" :key="index">
                  <div class="avatar-players">
                    <img
                      :src="getAvatarImageMini(swordman.characterId, swordman.avatar)"
                      alt="avatar player image"
                    />
                  </div>
                  <div class="data-player">
                    <div class="username-player">{{ swordman.name }}</div>
                    <div class="username-level">Nível: {{ swordman.level }}</div>
                    <div class="username-score">{{ formatNumber(swordman.score) }} pontos</div>
                  </div>
                  <div class="top-icon" :style="{ backgroundImage: getTopIcon(index + 1) }">
                    {{ index + 1 }}
                  </div>
                </li>
              </ul>
            </div>
            <div class="top-box-2">
              <ul>
                <li v-for="(fighter, index) in topFighters" :key="index">
                  <div class="avatar-players">
                    <img
                      :src="getAvatarImageMini(fighter.characterId, fighter.avatar)"
                      alt="avatar player image"
                    />
                  </div>
                  <div class="data-player">
                    <div class="username-player">{{ fighter.name }}</div>
                    <div class="username-level">Nível: {{ fighter.level }}</div>
                    <div class="username-score">{{ formatNumber(fighter.score) }} pontos</div>
                  </div>
                  <div class="top-icon" :style="{ backgroundImage: getTopIcon(index + 1) }">
                    {{ index + 1 }}
                  </div>
                </li>
              </ul>
            </div>
            <div class="top-box-3">
              <ul>
                <li v-for="(shooter, index) in topShooters" :key="index">
                  <div class="avatar-players">
                    <img
                      :src="getAvatarImageMini(shooter.characterId, shooter.avatar)"
                      alt="avatar player image"
                    />
                  </div>
                  <div class="data-player">
                    <div class="username-player">{{ shooter.name }}</div>
                    <div class="username-level">Nível: {{ shooter.level }}</div>
                    <div class="username-score">{{ formatNumber(shooter.score) }} pontos</div>
                  </div>
                  <div class="top-icon" :style="{ backgroundImage: getTopIcon(index + 1) }">
                    {{ index + 1 }}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </template>
      </ContainerComponent>
      <FooterComponent class="is-grid" />
    </div>
  </div>
</template>

<script setup lang="ts">
import images from '@/data/imageData';
import ContainerComponent from '@/components/ContainerComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import HeaderComponent from '@/components/HeaderComponent.vue';
import SidebarComponent from '@/components/SidebarComponent.vue';
import { formatDateToDateOnly, formatNumber } from '@/utils/utils';
import { getAvatarImageMini } from '@/utils/avatarUtils';
import { ref } from 'vue';
import type { INewspaper } from '@/interface/INewspaper';
import type { ITopPlayer } from '@/interface/IUserCharacter';

const newsList = ref<INewspaper[]>([
  { id: 1, date: '2024-01-20 23:37:59.20081-03', title: 'Alterações nos Preços do Shop' },
  { id: 1, date: '2024-01-20 23:37:59.20081-03', title: 'Alterações nos Preços do Shop' },
  { id: 1, date: '2024-01-20 23:37:59.20081-03', title: 'Alterações nos Preços do Shop' },
  { id: 1, date: '2024-01-20 23:37:59.20081-03', title: 'Alterações nos Preços do Shop' },
  { id: 1, date: '2024-01-20 23:37:59.20081-03', title: 'Alterações nos Preços do Shop' }
]);
const topPirates = ref<ITopPlayer[]>([
  { name: 'Test', level: 1, score: 0, characterId: 1, avatar: 2 },
  { name: 'Test', level: 1, score: 0, characterId: 2, avatar: 1 },
  { name: 'Test', level: 1, score: 0, characterId: 3, avatar: 1 }
]);
const topRevolutionaries = ref<ITopPlayer[]>([
  { name: 'Test', level: 1, score: 0, characterId: 1, avatar: 2 },
  { name: 'Test', level: 1, score: 0, characterId: 2, avatar: 1 },
  { name: 'Test', level: 1, score: 0, characterId: 3, avatar: 1 }
]);
const topMarines = ref<ITopPlayer[]>([
  { name: 'Test', level: 1, score: 0, characterId: 1, avatar: 2 },
  { name: 'Test', level: 1, score: 0, characterId: 2, avatar: 1 },
  { name: 'Test', level: 1, score: 0, characterId: 3, avatar: 1 }
]);
const topSwordsman = ref<ITopPlayer[]>([
  { name: 'Test', level: 1, score: 500, characterId: 1, avatar: 2 },
  { name: 'Test', level: 1, score: 1000, characterId: 2, avatar: 1 },
  { name: 'Test', level: 1, score: 10000, characterId: 3, avatar: 1 }
]);
const topFighters = ref<ITopPlayer[]>([
  { name: 'Test', level: 1, score: 150000, characterId: 1, avatar: 2 },
  { name: 'Test', level: 1, score: 25, characterId: 2, avatar: 1 },
  { name: 'Test', level: 1, score: 3986, characterId: 3, avatar: 1 }
]);
const topShooters = ref<ITopPlayer[]>([
  { name: 'Test', level: 1, score: 0, characterId: 1, avatar: 2 },
  { name: 'Test', level: 1, score: 0, characterId: 2, avatar: 1 },
  { name: 'Test', level: 1, score: 0, characterId: 3, avatar: 1 }
]);

const getTopIcon = (index: number) => {
  switch (index) {
    case 1:
      return `url(${images.topGoldImage})`;
    case 2:
      return `url(${images.topSilverImage})`;
    case 3:
      return `url(${images.topBronzeImage})`;
    default:
      return '';
  }
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

.newspaper-box {
  width: 700px;
  height: 323px;
  border-radius: 10px;
  background-repeat: no-repeat;
}

.newspaper-box ul {
  padding: 75px 0 0 16px;
  width: 325px;
}

.newspaper-box ul li {
  width: 360px;
  height: 38px;
  background-repeat: no-repeat;
  background-position: top left;
  float: left;
  line-height: 34px;
  overflow: hidden;
}

.newspaper-box ul li:hover {
  background-position: 0 -38px;
}

.newspaper-box-date {
  color: #ece8e1;
  margin-right: 6px;
  padding: 2px 0;
  text-align: center;
  text-shadow: 1px 1px 0 #761f0b;
  width: 66px;
  font-size: 14px;
  font-family: 'yanone_kaffeesatzregular';
  float: left;
}

.newspaper-box-title {
  color: #ece8e1;
  padding: 2px 0;
  width: 325px;
  text-shadow: 1px 1px 0 #895e13;
  font-size: 17px;
  font-family: 'yanone_kaffeesatzregular';
}

.top-players {
  width: 694px;
  height: 365px;
  margin: 0 6px 0 2px;
  background-repeat: no-repeat;
  background-position: top left;
  padding: 49px 0 0 6px;
}

.top-box-1 {
  width: 234px;
  height: 314px;
  float: left;
}

.top-box-2 {
  width: 232px;
  height: 314px;
  float: left;
}

.top-box-3 {
  width: 216px;
  height: 314px;
  float: left;
}

.top-players ul li {
  box-shadow: inset 0 0 20px 0 rgba(255, 255, 255, 1);
  position: relative;
  border-radius: 6px;
  width: 216px;
  height: 90px;
  float: left;
  margin-bottom: 5px;
}

.avatar-players {
  width: 79px;
  height: 79px;
  float: left;
  border-radius: 6px;
  margin: 6px 0 0 6px;
}

.avatar-players img {
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.3);
  border-radius: 15px 15px 15px 15px;
  border: 0px solid #000000;
  width: 75px;
  height: 75px;
}

.data-player {
  float: left;
  width: 100px;
  margin: 10px 0 0 6px;
}

.username-player {
  font-weight: bold;
  font-size: 26px;
  text-shadow: 1px 0 0 #6b5e45;
  font-family: 'yanone_kaffeesatzregular';
  color: #fff;
  float: left;
  line-height: 26px;
}

.username-level {
  font-size: 20px;
  text-shadow: 1px 0 0 #6b5e45;
  font-family: 'yanone_kaffeesatzregular';
  color: #fff;
  float: left;
  clear: both;
  line-height: 20px;
}

.username-score {
  font-size: 18px;
  clear: both;
  text-shadow: 1px 0px 0px #781515;
  font-family: 'yanone_kaffeesatzregular';
  color: #fff;
  float: left;
  line-height: 18px;
}

.top-icon {
  text-shadow: 1px 1px 1px #000;
  background-repeat: no-repeat;
  background-position: top center;
  left: -6px;
  position: absolute;
  top: 25px;
  width: 33px;
  height: 33px;
  float: right;
  font-size: 28px;
  font-family: 'yanone_kaffeesatzregular';
  color: #fff;
  text-align: center;
  line-height: 33px;
}
</style>
