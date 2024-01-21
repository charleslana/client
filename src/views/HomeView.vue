<template>
  <div class="bg" :style="{ backgroundImage: `url(${images.homeCloudsImage})` }">
    <div class="container">
      <figure class="welcome-image image">
        <img :src="displayedImage" alt="welcome image" />
      </figure>
      <div class="columns mt-5 is-relative z-2">
        <div class="column">
          <transition name="fade" mode="out-in">
            <div class="position" key="1" v-if="showCrews">
              <figure>
                <img :src="images.homeRankingCrewImage" alt="ranking crew image" />
              </figure>
              <div
                v-for="(crew, index) in rankingCrewList"
                :key="index"
                class="ranking-card"
                :style="{ backgroundImage: getBackgroundImage(crew.type) }"
              >
                <div class="position">{{ index + 1 }}</div>
                <div class="data-1" :style="{ color: getColor(crew.type) }">{{ crew.name }}</div>
                <div class="data-2">Cap: {{ crew.captain }}</div>
                <div class="data-3">
                  Nv.: <span>{{ crew.level }}</span>
                </div>
                <div class="data-4">{{ crew.members }}</div>
                <div class="data-5">membros</div>
              </div>
              <button class="toggle-button" @click="togglePlayers">jogadores</button>
            </div>
            <div class="position" key="2" v-else>
              <figure>
                <img :src="images.homeRankingPlayerImage" alt="ranking player image" />
              </figure>
              <div
                v-for="(player, index) in rankingPlayerList"
                :key="index"
                class="ranking-card"
                :style="{ backgroundImage: getBackgroundImage(player.type) }"
              >
                <div class="position">{{ index + 1 }}</div>
                <div class="data-1" :style="{ color: getColor(player.type) }">
                  {{ player.name }}
                </div>
                <div class="data-2">Trip.: {{ player.crewName }}</div>
                <div class="data-3">
                  Nv.: <span>{{ player.level }}</span>
                </div>
                <div class="data-4">{{ formatNumber(player.reputation) }}</div>
                <div class="data-5">Reputação</div>
              </div>
              <button class="toggle-button override-space" @click="toggleCrews">tripulações</button>
            </div>
          </transition>
        </div>
        <div class="column">
          <div class="is-pulled-right">
            <div class="register">
              <RouterLink to="/register">
                <img :src="images.homeRegisterImage" alt="register image" />
              </RouterLink>
              <transition name="fade">
                <div v-if="showAlert" class="custom-alert error z-2">{{ errorMessage }}</div>
              </transition>
              <div
                class="login-box"
                :style="{ backgroundImage: `url(${images.homeLoginBoxImage})` }"
                v-if="!loading && !logged"
              >
                <form @submit.prevent="login">
                  <input
                    type="text"
                    placeholder="nome do usuário"
                    class="name"
                    id="name"
                    ref="userNameRef"
                    v-model="username"
                    autocomplete="false"
                  />
                  <input
                    type="password"
                    placeholder="••••••"
                    class="password"
                    id="password"
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
                  @click="$router.push({ name: 'forgot-password' })"
                ></button>
              </div>
              <HomeLoggedComponent
                v-if="logged"
                @send-message="receiveMessageFromChild"
                @toggle-loading="handleLoadingToggle"
              />
              <div
                class="bg-login-box"
                :style="{ backgroundImage: `url(${images.homeBgLoginBoxImage})` }"
                v-if="loading"
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
import { computed, onMounted, ref } from 'vue';
import { formatNumber } from '@/utils/utils';
import HomeLoggedComponent from '@/components/HomeLoggedComponent.vue';
import { isAuthenticated, saveToken } from '@/utils/localStorageUtils';
import UserService from '@/service/UserService';
import type { AxiosError } from 'axios';
import type ICelebrateError from '@/interface/ICelebrateError';

const imagesArray: string[] = [
  images.homeCaesarClownImage,
  images.homeLawImage,
  images.homeLuffyImage,
  images.homeLuffy2Image,
  images.homeNeptuneImage,
  images.homeSmokerImage
];
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
const loading = ref(false);
const loadingKey = ref(0);
const username = ref('');
const userPassword = ref('');
const logged = ref(false);
const showAlert = ref(false);
const errorMessage = ref('');
let timeoutId: ReturnType<typeof setTimeout> | null = null;

onMounted(() => {
  logged.value = isAuthenticated();
});

const displayedImage = computed(() => {
  const randomIndex = Math.floor(Math.random() * imagesArray.length);
  return imagesArray[randomIndex];
});

const isLoginDisabled = computed(() => {
  return username.value === '' || userPassword.value === '';
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

function getColor(type: HomeRankingType): string {
  if (type === 'marine') {
    return '#082f4f';
  }
  if (type === 'revolutionary') {
    return '#357735';
  }
  return '#cb1b03';
}

function togglePlayers(): void {
  showPlayers.value = true;
  showCrews.value = false;
}

function toggleCrews(): void {
  showPlayers.value = false;
  showCrews.value = true;
}

function showLoading(): void {
  showAlert.value = false;
  loading.value = true;
  loadingKey.value += 1;
}

function hideLoading(): void {
  loading.value = false;
}

function login(): void {
  showLoading();
  authAPI();
}

const receiveMessageFromChild = (message: string) => {
  errorMessage.value = message;
  showMessage();
};

const showMessage = (): void => {
  showAlert.value = true;
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  timeoutId = setTimeout(() => {
    showAlert.value = false;
  }, 4000);
};

const handleLoadingToggle = (value: boolean) => {
  if (value) {
    showLoading();
    return;
  }
  hideLoading();
};

async function authAPI(): Promise<void> {
  try {
    const token = await UserService.login({
      username: username.value,
      password: userPassword.value
    });
    saveToken(token.token);
    logged.value = true;
  } catch (err: unknown) {
    const error = err as AxiosError<ICelebrateError>;
    if (error.response && error.response.data) {
      errorMessage.value = error.response.data.message;
      showMessage();
    }
  } finally {
    hideLoading();
  }
}
</script>

<style scoped>
.bg {
  background-color: #1eb5f0;
  background-position: top center;
  background-repeat: no-repeat;
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
  position: relative;
}

.container {
  padding-bottom: 160px;
  width: 100%;
}

.footer {
  background-color: #1eb5f0;
  width: 100%;
  height: 60px;
  position: absolute;
  bottom: 0;
}

.welcome-image {
  position: absolute;
  top: 5vh;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
}

.welcome-image img {
  max-width: 100%;
  max-height: calc(100vh - 10vh);
}

.position {
  width: 313px;
}

.ranking-card {
  width: 313px;
  height: 44px;
  position: relative;
  margin-top: 5px;
}

.ranking-card .position {
  font-family: yanone_kaffeesatzregular;
  position: absolute;
  top: 1px;
  left: 22px;
  font-size: 36px;
  width: 35px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: white;
  text-shadow: 0px 1px 1px #000;
}

.ranking-card .data-1 {
  font-family: yanone_kaffeesatzregular;
  position: absolute;
  top: 1px;
  left: 64px;
  font-size: 24px;
  width: 117px;
  height: 25px;
  line-height: 25px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ranking-card .pirate {
  color: #cb1b03;
}

.ranking-card .data-2 {
  font-family: yanone_kaffeesatzregular;
  position: absolute;
  top: 27px;
  left: 68px;
  font-size: 13px;
  width: 114px;
  height: 16px;
  line-height: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: white;
}

.ranking-card .data-3 {
  font-family: yanone_kaffeesatzregular;
  position: absolute;
  top: 8px;
  left: 195px;
  font-size: 14px;
  width: 55px;
  height: 16px;
  line-height: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #988f43;
}

.ranking-card .data-3 span {
  font-family: yanone_kaffeesatzregular;
  font-size: 16px;
}

.ranking-card .data-4 {
  font-family: yanone_kaffeesatzregular;
  position: absolute;
  top: 1px;
  left: 260px;
  font-size: 20px;
  width: 55px;
  height: 20px;
  line-height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #988f43;
}

.ranking-card .data-5 {
  font-family: yanone_kaffeesatzregular;
  position: absolute;
  top: 17px;
  left: 256px;
  font-size: 14px;
  width: 55px;
  height: 16px;
  line-height: 16px;
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
  transition: opacity 0.2s ease-in;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.register {
  margin-top: 20px;
  position: relative;
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

.bg-login-box img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.custom-alert {
  background-color: #fcf8e3;
  border: 1px solid #fbeed5;
  border-radius: 4px 4px 4px 4px;
  box-shadow: 0 1px 1px 0 rgba(180, 180, 180, 0.1);
  font-family: Arial, sans-serif;
  font-size: 12px;
  line-height: 18px;
  padding: 8px 35px 8px 14px;
  position: absolute;
  top: 5vh;
  left: 35%;
  transform: translateX(-50%);
  text-align: center;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
  max-width: 392px;
  min-width: 200px;
}

.custom-alert.error {
  background-color: #f2dede;
  border-color: #eed3d7;
  color: #b94a48;
}

.z-2 {
  z-index: 2;
}
</style>
