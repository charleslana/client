<template>
  <div
    v-if="step === 1"
    class="manage-account-bg"
    :style="{ backgroundImage: `url(${images.layoutManageAccountBoxImage})` }"
  >
    <div class="columns is-multiline is-flex">
      <div
        class="column character-box is-flex is-align-items-center"
        v-for="index in 12"
        :key="index"
        @click="index <= 6 ? goToStep(2) : null"
      >
        <img
          class="create-character"
          :src="
            index <= 6 ? images.layoutCreateCharacterImage : images.layoutCreateCharacterVipImage
          "
          alt="create character image"
        />
      </div>
    </div>
  </div>
  <div
    v-if="step === 2"
    class="manage-account-large-bg"
    :style="{ backgroundImage: `url(${images.layoutManageAccountBoxLargeImage})` }"
  >
    <h2 class="title-box mb-2">Escolha sua facção</h2>
    <div>
      <img
        class="faction-image"
        :src="
          factionSelected === 'pirate'
            ? images.layoutLuffySelectedImage
            : images.layoutLuffyUnselectedImage
        "
        alt="pirate faction image"
        @mouseover="factionSelected = 'pirate'"
        @mouseleave="factionSelected = null"
        @click="chooseFaction('pirate')"
      />
      <img
        class="faction-image"
        :src="
          factionSelected === 'marine'
            ? images.layoutAkainuSelectedImage
            : images.layoutAkainuUnselectedImage
        "
        alt="marine faction image"
        @mouseover="factionSelected = 'marine'"
        @mouseleave="factionSelected = null"
        @click="chooseFaction('marine')"
      />
      <img
        class="faction-image"
        :src="
          factionSelected === 'revolutionary'
            ? images.layoutDragonSelectedImage
            : images.layoutDragonUnselectedImage
        "
        alt="revolutionary faction image"
        @mouseover="factionSelected = 'revolutionary'"
        @mouseleave="factionSelected = null"
        @click="chooseFaction('revolutionary')"
      />
    </div>
    <div class="has-text-centered mt-5">
      <RedButtonComponent text="Cancelar" :func="() => goToStep(1)" />
    </div>
  </div>
  <div
    v-if="step === 3"
    class="manage-account-large-bg"
    :style="{ backgroundImage: `url(${images.layoutManageAccountBoxLargeImage})` }"
  >
    <h2 class="title-box mb-2">Escolha seu avatar</h2>
    <div class="avatar-box has-text-centered">
      <img
        v-for="avatar in avatars"
        :key="avatar.id"
        @click="goToStep(4)"
        class="avatar-image"
        :src="getAvatarImageMini(avatar.id)"
        alt="avatar image"
      />
    </div>
    <div class="has-text-centered">
      <RedButtonComponent text="Cancelar" :func="() => goToStep(2)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import images from '@/data/imageData';
import type { IAvatar } from '@/interface/IAvatar';
import { ref } from 'vue';
import { getAvatarImageMini } from '@/utils/avatar-utils';
import RedButtonComponent from './RedButtonComponent.vue';

const step = ref(3);
const factionSelected = ref<'pirate' | 'marine' | 'revolutionary' | null>(null);
const faction = ref<'pirate' | 'marine' | 'revolutionary' | null>(null);
const avatars = ref<IAvatar[]>([
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' },
  { id: 1, name: 'Hannyabal' }
]);

function goToStep(number: number): void {
  switch (number) {
    case 1:
      step.value = 1;
      faction.value = null;
      break;
    case 2:
      step.value = 2;
      break;
    case 3:
      step.value = 3;
      break;
    case 4:
      step.value = 4;
      break;
    default:
      break;
  }
}

function chooseFaction(selectFaction: 'pirate' | 'marine' | 'revolutionary'): void {
  faction.value = selectFaction;
  goToStep(3);
}
</script>

<style scoped>
.manage-account-bg {
  width: 418px;
  height: 672px;
  padding: 20px;
  overflow-y: auto;
}

.character-box {
  width: 123px;
  height: 149px;
  opacity: 0.6;
  cursor: pointer;
  margin-bottom: 10px;
  padding: 5px;
}

.character-box:hover {
  background-color: #c9b695;
  border-radius: 5px;
  box-shadow: 5px 5px 10px #ccc;
  opacity: 1;
}

.create-character {
  width: 113px;
  height: 114px;
  max-width: none;
}

.manage-account-large-bg {
  width: 396px;
  height: 654px;
  padding: 20px 15px;
}

.title-box {
  font-family: yanone_kaffeesatzregular;
  font-size: 32px;
  color: #928470;
  text-transform: uppercase;
  text-shadow: 0px 2px #b3a898;
  text-align: center;
  font-weight: bold;
}

.faction-image {
  height: 361px;
  max-width: none;
  padding: 3px;
  cursor: pointer;
}

.faction-image:hover {
  background: #c9b695;
  border-radius: 5px;
  box-shadow: 5px 5px 10px #ccc;
}

.avatar-box {
  height: 530px;
  overflow-y: auto;
  margin-bottom: 7px;
}

.avatar-image {
  padding: 3px;
  opacity: 0.5;
  cursor: pointer;
  border-radius: 2px;
  border: 2px solid #dedede;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.3);
  width: 70px;
  height: 70px;
  vertical-align: top;
}

.avatar-image:hover {
  background: #c9b695;
  border-radius: 2px;
  box-shadow: 5px 5px 10px #ccc;
  opacity: 1;
}
</style>
