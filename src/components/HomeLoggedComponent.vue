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
    <h2 class="title-box has-text-centered mb-2">Escolha sua facção</h2>
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
      <HomeButtonComponent text="Cancelar" :color="ButtonColorEnum.Red" :func="() => goToStep(1)" />
    </div>
  </div>
  <div
    v-if="step === 3"
    class="manage-account-large-bg"
    :style="{ backgroundImage: `url(${images.layoutManageAccountBoxLargeImage})` }"
  >
    <h2 class="title-box has-text-centered mb-2">Escolha seu avatar</h2>
    <div class="avatar-box has-text-centered">
      <img
        v-for="avatar in avatars"
        :key="avatar.id"
        @click="chooseAvatar(avatar.id)"
        class="avatar-image"
        :src="getAvatarImageMini(avatar.id, avatar.avatar)"
        alt="avatar image"
      />
    </div>
    <div class="has-text-centered">
      <HomeButtonComponent text="Cancelar" :color="ButtonColorEnum.Red" :func="() => goToStep(2)" />
    </div>
  </div>
  <div
    v-if="step === 4"
    class="manage-account-large-bg"
    :style="{ backgroundImage: `url(${images.layoutManageAccountBoxLargeImage})` }"
  >
    <h2 class="title-box mb-2">Preencha os dados</h2>
    <form @submit.prevent="registerForm">
      <h1 class="label mb-0">Nome do personagem</h1>
      <input type="text" name="nome" class="input-text" v-model="characterName" />
      <h1 class="label mt-5 mb-0">Mar</h1>
      <select class="input-select" v-model="sea">
        <option value="1" selected>North Blue</option>
        <option value="2">East Blue</option>
        <option value="3">South Blue</option>
        <option value="4">West Blue</option>
      </select>
      <h1 class="label mt-5 mb-0">Raça</h1>
      <select class="input-select" v-model="breed">
        <option value="1">Humano</option>
        <option value="2">Anão</option>
        <option value="3">Gigante</option>
        <option value="4">Tritão (VIP)</option>
        <option value="5">Ciborgue (VIP)</option>
      </select>
      <h1 class="label mt-5 mb-0">Classe</h1>
      <select class="input-select" v-model="_class">
        <option value="1">Espadachim</option>
        <option value="2">Atirador</option>
        <option value="3">Lutador</option>
      </select>
      <div class="mt-5">
        <HomeButtonComponent
          text="Cancelar"
          :color="ButtonColorEnum.Red"
          :func="() => clearFormCharacter()"
          class="mr-4"
          type="button"
        />
        <HomeButtonComponent text="Criar" :func="() => {}" />
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import images from '@/data/imageData';
import type { IAvatar } from '@/interface/IAvatar';
import { ref } from 'vue';
import { getAvatarImageMini } from '@/utils/avatar-utils';
import HomeButtonComponent from './HomeButtonComponent.vue';
import { ButtonColorEnum } from '@/enum/ButtonColorEnum';

const step = ref(4);
const factionSelected = ref<'pirate' | 'marine' | 'revolutionary' | null>(null);
const faction = ref<'pirate' | 'marine' | 'revolutionary' | null>(null);
const avatars: IAvatar[] = Array(184).fill({ id: 1, name: 'Hannyabal', avatar: 1 });
avatars[1] = { id: 2, name: 'Aokiji', avatar: 1 };
avatars[2] = { id: 3, name: 'Benn-Beckman', avatar: 1 };
avatars[3] = { id: 4, name: 'Zephyr', avatar: 1 };
avatars[4] = { id: 5, name: 'Charlotte-Perospero', avatar: 1 };
const avatar = ref<number | null>(null);
const characterName = ref('');
const sea = ref('1');
const breed = ref('1');
const _class = ref('1');

const emit = defineEmits(['send-message']);

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
  scrollToTop();
}

function chooseFaction(selectFaction: 'pirate' | 'marine' | 'revolutionary'): void {
  faction.value = selectFaction;
  goToStep(3);
}

function chooseAvatar(selectAvatar: number): void {
  avatar.value = selectAvatar;
  goToStep(4);
}

function clearFormCharacter(): void {
  goToStep(3);
}

function registerForm(): void {
  // alert(`${characterName.value} | ${sea.value} | ${breed.value} | ${_class.value}`);
  emit('send-message', 'O nome escolhido já está em uso');
  scrollToTop();
}

function scrollToTop(): void {
  window.scrollTo({ top: 0, behavior: 'smooth' });
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

.label {
  font-size: 18px;
}

.input-text {
  background-color: #f2ebe0;
  border-radius: 5px;
  padding: 4px;
  font-family: yanone_kaffeesatzregular;
  width: 223px;
  box-shadow: -1px 2px 5px #c1a985;
  border-bottom: 1px solid #c1a985;
  height: 38px;
  border: none;
  font-size: 22px;
  color: #8d7a66;
}

.input-select {
  background-color: #f2ebe0;
  border-radius: 5px;
  padding: 4px;
  font-family: yanone_kaffeesatzregular;
  width: 223px;
  box-shadow: -1px 2px 5px #c1a985;
  border-bottom: 1px solid #c1a985;
  height: 38px;
  border: none;
  font-size: 22px;
  color: #8d7a66;
}
</style>
