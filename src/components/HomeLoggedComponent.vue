<template>
  <div
    v-if="step === 1"
    class="manage-account-bg"
    :style="{ backgroundImage: `url(${images.layoutManageAccountBoxImage})` }"
  >
    <div class="columns is-multiline">
      <div
        class="column character-box is-flex is-align-items-center"
        v-for="index in 12"
        :key="index"
        @click="goToStep(2)"
      >
        <img
          class="create-character"
          :src="images.layoutCreateCharacterImage"
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
    <h2 class="faction mb-2">Escolha sua facção</h2>
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
        @click="faction = 'pirate'"
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
        @click="faction = 'marine'"
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
        @click="faction = 'revolutionary'"
      />
    </div>
    <div class="has-text-centered mt-5">
      <button
        class="cancel-button"
        :style="{ backgroundImage: `url(${images.layoutRedButtonImage})` }"
        @click="goToStep(1)"
      >
        Cancelar
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import images from '@/data/imageData';
import { ref } from 'vue';

const step = ref(2);
const factionSelected = ref<'pirate' | 'marine' | 'revolutionary' | null>(null);
const faction = ref<'pirate' | 'marine' | 'revolutionary' | null>(null);

function goToStep(number: number): void {
  switch (number) {
    case 1:
      step.value = 1;
      faction.value = null;
      break;
    case 2:
      step.value = 2;
      break;
    default:
      break;
  }
}
</script>

<style scoped>
.manage-account-bg {
  width: 418px;
  height: 672px;
  padding: 20px;
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

.faction {
  font-family: yanone_kaffeesatzregular;
  font-size: 32px;
  color: #928470;
  text-transform: uppercase;
  text-shadow: 0px 2px #b3a898;
  text-align: center;
  font-weight: bold;
}

.faction-image {
  width: 114px;
  height: 355px;
  max-width: none;
  padding: 3px;
  cursor: pointer;
}

.faction-image:hover {
  background: #c9b695;
  border-radius: 5px;
  box-shadow: 5px 5px 10px #ccc;
}

.cancel-button {
  padding: 5px;
  font-family: yanone_kaffeesatzregular;
  font-size: 22px;
  color: #fff;
  text-transform: uppercase;
  text-shadow: 0px 2px #111;
  width: 105px;
  text-align: center;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
}
</style>
