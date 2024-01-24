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
      <ContainerComponent>
        <template v-slot:content>
          <div class="title-bg" :style="{ backgroundImage: `url(${images.titleBgImage})` }">
            Escolha um avatar
          </div>
          <div
            class="avatar-top"
            :style="{ backgroundImage: `url(${images.patternSelectionTopImage})` }"
          ></div>
          <div
            class="avatar-container"
            :style="{ backgroundImage: `url(${images.patternSelectionImage})` }"
          >
            <div class="avatar-title">Selecione seu novo avatar</div>
            <div class="columns is-multiline is-flex is-centered has-text-centered">
              <div
                class="column avatar-box"
                v-for="index in avatarMax"
                :key="index"
                @click="saveAvatar(index)"
              >
                <img
                  :src="getAvatarImageStatus(characterId, index)"
                  alt="avatar image"
                  :class="{ choose: avatar !== index, blinking: isBlinking }"
                  width="177"
                />
              </div>
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
import { getAvatarImageStatus } from '@/utils/avatarUtils';
import { ref, watch } from 'vue';
import { userCharacterStore as useUserCharacterStore } from '@/stores/userCharacterStore';
import UserCharacterService from '@/service/UserCharacterService';
import { showAlert, showError } from '@/utils/utils';

const store = useUserCharacterStore();
const avatar = ref<number>(store.userCharacter.avatar);
const avatarMax = ref(store.userCharacter.character.avatarMax);
const characterId = ref(store.userCharacter.characterId);
const isBlinking = ref(false);

watch(
  () => store.userCharacter,
  (newUserCharacter) => {
    avatar.value = newUserCharacter.avatar;
    avatarMax.value = newUserCharacter.character.avatarMax;
    characterId.value = newUserCharacter.characterId;
  }
);

function saveAvatar(selectedAvatar: number): void {
  if (isBlinking.value) {
    return;
  }
  isBlinking.value = true;
  changeAvatarAPI(selectedAvatar);
}

async function changeAvatarAPI(selectedAvatar: number): Promise<void> {
  try {
    const response = await UserCharacterService.updateAvatar(selectedAvatar);
    avatar.value = selectedAvatar;
    store.saveAvatar(selectedAvatar);
    showAlert(response.message, 'success');
  } catch (err: unknown) {
    showError(err);
  } finally {
    setTimeout(() => {
      isBlinking.value = false;
    }, 0);
  }
}
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

.avatar-container {
  width: 725px;
  background-repeat: repeat-y;
  margin: 10px 0 0 -7px;
  padding: 0 20px;
}

.avatar-top {
  width: 725px;
  height: 13px;
  background-repeat: no-repeat;
  margin: 0 0 -14px -7px;
}

.avatar-title {
  font-family: 'yanone_kaffeesatzregular';
  font-size: 30px;
  color: #c7c7c7;
  text-shadow: 1px 1px #000;
  text-align: center;
  margin-bottom: 10px;
}

.avatar-box {
  cursor: pointer;
  margin-bottom: 10px;
  padding: 5px;
  flex-grow: 0;
}

.avatar-box img {
  height: auto;
  max-width: none;
  margin: 0 3px 0px;
}

.avatar-box .choose {
  opacity: 0.7;
}

@keyframes blink {
  0%,
  50%,
  100% {
    opacity: 1;
  }
  25%,
  75% {
    opacity: 0.5;
  }
}

.blinking {
  animation: blink 2s infinite;
}
</style>
