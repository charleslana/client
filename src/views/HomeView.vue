<template>
  <div>
    <div class="bg" :style="{ backgroundImage: `url(${images.homeCloudsImage})` }">
      <img :src="displayedImage" alt="random image" class="random-image" />
      <div class="container">
        <div class="flex space-between">
          <div>
            <transition name="fade">
              <div class="position" v-show="showCrews" :key="playersKey">
                <img :src="images.homeRankingCrewImage" alt="ranking crew image" />
                <div class="flex flex-column">
                  <div
                    v-for="(crew, index) in rankingCrewList"
                    :key="index"
                    class="card"
                    :style="{ backgroundImage: getBackgroundImage(crew.type) }"
                  >
                    <div class="position">{{ index + 1 }}</div>
                    <div class="data-1">{{ crew.name }}</div>
                    <div class="data-2">Cap: {{ crew.captain }}</div>
                    <div class="data-3">
                      Nv.: <span>{{ crew.level }}</span>
                    </div>
                    <div class="data-4">{{ crew.members }}</div>
                    <div class="data-5">membros</div>
                  </div>
                  <button class="toggle-button override-space" @click="togglePlayers">
                    jogadores
                  </button>
                </div>
              </div>
            </transition>
            <transition name="fade">
              <div class="position" v-show="showPlayers" :key="crewsKey">
                <img :src="images.homeRankingPlayerImage" alt="ranking player image" />
                <div class="flex flex-column">
                  <div
                    v-for="(player, index) in rankingPlayerList"
                    :key="index"
                    class="card"
                    :style="{ backgroundImage: getBackgroundImage(player.type) }"
                  >
                    <div class="position">{{ index + 1 }}</div>
                    <div class="data-1">{{ player.name }}</div>
                    <div class="data-2">Trip.: {{ player.crewName }}</div>
                    <div class="data-3">
                      Nv.: <span>{{ player.level }}</span>
                    </div>
                    <div class="data-4">{{ formatNumber(player.reputation) }}</div>
                    <div class="data-5">Reputação</div>
                  </div>
                  <button class="toggle-button override-space" @click="toggleCrews">
                    tripulações
                  </button>
                </div>
              </div>
            </transition>
          </div>
          <div class="register">
            <RouterLink to="/register">
              <img :src="images.homeRegisterImage" alt="register image" />
            </RouterLink>
            <div
              class="login-box"
              :style="{ backgroundImage: `url(${images.homeLoginBoxImage})` }"
              v-show="!loading"
            >
              <form @submit.prevent="login">
                <input
                  type="text"
                  placeholder="nome do usuário"
                  class="name"
                  ref="userNameRef"
                  v-model="userName"
                />
                <input
                  type="password"
                  placeholder="••••••"
                  class="password"
                  v-model="userPassword"
                />
                <button
                  class="login-button"
                  :style="{ backgroundImage: `url(${images.homeLoginButtonImage})` }"
                  :disabled="isLoginDisabled"
                ></button>
              </form>
              <button
                class="login-new-password"
                :style="{ backgroundImage: `url(${images.homeNewPasswordButtonImage})` }"
                @click="$router.push({ name: 'new-password' })"
              ></button>
            </div>
            <div
              class="bg-login-box"
              :style="{ backgroundImage: `url(${images.homeBgLoginBoxImage})` }"
              v-show="loading"
            >
              <img
                :src="images.homeLoadingImage"
                :key="loadingKey"
                alt="loading image"
                class="random-image"
                width="150"
                height="150"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer" :style="{ backgroundImage: `url(${images.homePatternMarImage})` }"></div>
  </div>
</template>

<script setup lang="ts">
import images from '@/data/imageData';
import type {
  HomeRankingType,
  IHomeCrewRanking,
  IHomePlayerRanking
} from '@/interface/IHomeRanking';
import { computed, onMounted, ref, type Ref } from 'vue';
import { formatNumber } from '@/utils/utils';

const rankingCrewList: IHomeCrewRanking[] = [
  { name: 'Pirates Rocks', captain: 'King Pirate', level: 10, members: 12, type: 'pirate' },
  { name: 'Marine Squad', captain: 'Admiral', level: 15, members: 20, type: 'marine' },
  { name: 'Marine Squad', captain: 'Admiral', level: 15, members: 20, type: 'marine' },
  { name: 'Marine Squad', captain: 'Admiral', level: 15, members: 20, type: 'marine' },
  {
    name: 'Revolutionary Army',
    captain: 'Revolutionary',
    level: 18,
    members: 15,
    type: 'revolutionary'
  }
];
const rankingPlayerList: IHomePlayerRanking[] = [
  {
    name: 'Name E',
    crewName: 'Revolutionary Army',
    level: 18,
    reputation: 15000,
    type: 'revolutionary'
  },
  { name: 'Name B', crewName: 'Marine Squad', level: 15, reputation: 20, type: 'marine' },
  { name: 'Name C', crewName: 'Marine Squad', level: 15, reputation: 20, type: 'marine' },
  { name: 'Name D', crewName: 'Marine Squad', level: 15, reputation: 20, type: 'marine' },
  { name: 'Name A', crewName: 'Pirates Rocks', level: 10, reputation: 12, type: 'pirate' }
];
const showCrews = ref(true);
const showPlayers = ref(false);
const playersKey = ref(0);
const crewsKey = ref(0);
const loading = ref(false);
const loadingKey = ref(0);
const userName = ref('');
const userPassword = ref('');

const imagesArray: string[] = [
  images.homeCaesarClownImage,
  images.homeLawImage,
  images.homeLuffyImage,
  images.homeLuffy2Image,
  images.homeNeptuneImage,
  images.homeSmokerImage
];

const userNameRef: Ref<HTMLElement | null> = ref(null);

onMounted(() => {
  if (userNameRef.value) {
    userNameRef.value.focus();
  }
});

const displayedImage = computed(() => {
  const randomIndex = Math.floor(Math.random() * imagesArray.length);
  return imagesArray[randomIndex];
});

const isLoginDisabled = computed(() => {
  return userName.value === '' || userPassword.value === '';
});

function getBackgroundImage(type: HomeRankingType): string {
  if (type === 'marine') {
    return `url(${images.homeRankingMarineImage})`;
  }
  if (type === 'revolutionary') {
    return `url(${images.homeRankingRevolutionaryImage})`;
  }
  return `url(${images.homeRankingPirateImage})`;
}

function togglePlayers(): void {
  showPlayers.value = true;
  showCrews.value = false;
  playersKey.value += 1;
}

function toggleCrews(): void {
  showPlayers.value = false;
  showCrews.value = true;
  crewsKey.value += 1;
}

function showLoading(): void {
  loading.value = true;
  loadingKey.value += 1;
}

function hideLoading(): void {
  loading.value = false;
}

function login(): void {
  showLoading();
  setTimeout(() => {
    hideLoading();
  }, 2000);
}
</script>

<style scoped>
.bg {
  background-color: #1eb5f0;
  background-position: top center;
  background-repeat: no-repeat;
  height: 100vh;
  min-height: 100%;
}

.footer {
  width: 100%;
  height: 295px;
  background-repeat: repeat-x;
  position: absolute;
  bottom: 0;
  left: 0;
}

.container {
  padding-left: 10%;
  padding-right: 10%;
  padding-top: 2%;
}

.random-image {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.position {
  width: 313px;
}

.card {
  width: 313px;
  height: 44px;
  position: relative;
  margin-top: 5px;
}

.card .position {
  font-family: yanone_kaffeesatzregular;
  position: absolute;
  top: 1px;
  left: 22px;
  font-size: 36px;
  width: 35px;
  height: 40px;
  text-align: center;
  color: white;
  text-shadow: 0px 1px 1px #000;
}

.card .data-1 {
  font-family: yanone_kaffeesatzregular;
  position: absolute;
  top: 1px;
  left: 64px;
  font-size: 24px;
  width: 117px;
  height: 25px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.card .pirate {
  color: #cb1b03;
}

.card .data-2 {
  font-family: yanone_kaffeesatzregular;
  position: absolute;
  top: 27px;
  left: 68px;
  font-size: 13px;
  width: 114px;
  height: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: white;
}

.card .data-3 {
  font-family: yanone_kaffeesatzregular;
  position: absolute;
  top: 8px;
  left: 195px;
  font-size: 14px;
  width: 55px;
  height: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #988f43;
}

.card .data-3 span {
  font-family: yanone_kaffeesatzregular;
  font-size: 16px;
}

.card .data-4 {
  font-family: yanone_kaffeesatzregular;
  position: absolute;
  top: 1px;
  left: 260px;
  font-size: 20px;
  width: 55px;
  height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #988f43;
}

.card .data-5 {
  font-family: yanone_kaffeesatzregular;
  position: absolute;
  top: 17px;
  left: 256px;
  font-size: 14px;
  width: 55px;
  height: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #988f43;
}

.toggle-button {
  font-family: yanone_kaffeesatzregular;
  border-radius: 5px;
  background-color: #d4830f;
  box-shadow: 0px 1px #90590a;
  cursor: pointer;
  color: white;
  font-size: 12px;
  text-align: center;
  text-transform: uppercase;
  padding: 4px 9px 1px;
  margin: 10px 0 0 21px;
  border: none;
  width: auto;
}

.toggle-button:hover {
  background-color: #c07811;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.9s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.register {
  margin-top: 20px;
}

.login-box {
  width: 290px;
  height: 181px;
  position: relative;
}

.login-box .name {
  font-family: yanone_kaffeesatzregular;
  position: absolute;
  top: 34px;
  left: 15px;
  font-size: 24px;
  width: 260px;
  height: 39px;
  background: none;
  border: none;
  padding-left: 5px;
  color: #8d7a66;
}

.login-box .password {
  font-family: yanone_kaffeesatzregular;
  position: absolute;
  top: 97px;
  left: 15px;
  font-size: 24px;
  width: 260px;
  height: 39px;
  background: none;
  border: none;
  padding-left: 5px;
  color: #8d7a66;
}

.login-button {
  position: absolute;
  top: 154px;
  left: 22px;
  font-size: 24px;
  width: 122px;
  height: 40px;
  border: none;
  background-color: transparent;
  cursor: pointer;
}

.login-button:hover,
.login-new-password:hover {
  background-position: 0 -40px;
}

.login-new-password {
  position: absolute;
  top: 154px;
  left: 148px;
  font-size: 24px;
  width: 122px;
  height: 40px;
  border: none;
  background-color: transparent;
  cursor: pointer;
}

.bg-login-box {
  width: 282px;
  height: 173px;
  position: relative;
}
</style>
