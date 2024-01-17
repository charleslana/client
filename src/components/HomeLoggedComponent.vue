<template>
  <div
    v-if="step === 1 && !loading"
    class="manage-account-bg"
    :style="{ backgroundImage: `url(${images.layoutManageAccountBoxImage})` }"
  >
    <div class="columns is-multiline is-flex">
      <div
        v-for="(character, index) in myCharacters"
        :key="index"
        class="column character-box is-flex is-align-items-start"
        @click="selectCharacter(character.id)"
      >
        <div
          class="character-select"
          :style="{ backgroundImage: `url(${getFactionBox(character.faction)})` }"
        >
          <img
            class="create-character"
            :src="getAvatarImageMini(character.characterId, 1)"
            alt="my character image"
          />
          <div
            class="character-name"
            :style="{ backgroundImage: `url(${getFactionButton(character.faction)})` }"
          >
            {{ character.name }}
          </div>
          <div class="character-level" :class="character.faction">Nível 1</div>
          <button class="character-delete" @click.stop="confirmDeletion(character.id)">
            deletar
          </button>
        </div>
      </div>
      <div
        class="column character-box is-flex is-align-items-center"
        v-for="index in 12 - myCharacters.length"
        :key="index"
        @click="index <= 6 - myCharacters.length || isVip ? goToStep(2) : null"
      >
        <img
          class="create-character"
          :src="
            index <= 6 - myCharacters.length || isVip
              ? images.layoutCreateCharacterImage
              : images.layoutCreateCharacterVipImage
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
        @mouseover="factionSelected = UserCharacterFactionEnum.Pirate"
        @mouseleave="factionSelected = null"
        @click="chooseFaction(UserCharacterFactionEnum.Pirate)"
      />
      <img
        class="faction-image"
        :src="
          factionSelected === 'marine'
            ? images.layoutAkainuSelectedImage
            : images.layoutAkainuUnselectedImage
        "
        alt="marine faction image"
        @mouseover="factionSelected = UserCharacterFactionEnum.Marine"
        @mouseleave="factionSelected = null"
        @click="chooseFaction(UserCharacterFactionEnum.Marine)"
      />
      <img
        class="faction-image"
        :src="
          factionSelected === 'revolutionary'
            ? images.layoutDragonSelectedImage
            : images.layoutDragonUnselectedImage
        "
        alt="revolutionary faction image"
        @mouseover="factionSelected = UserCharacterFactionEnum.Revolutionary"
        @mouseleave="factionSelected = null"
        @click="chooseFaction(UserCharacterFactionEnum.Revolutionary)"
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
        v-for="character in characters"
        :key="character.id"
        @click="chooseAvatar(character.id)"
        class="avatar-image"
        :src="getAvatarImageMini(character.id, 1)"
        alt="avatar image"
      />
    </div>
    <div class="has-text-centered">
      <HomeButtonComponent text="Cancelar" :color="ButtonColorEnum.Red" :func="() => goToStep(2)" />
    </div>
  </div>
  <div
    v-if="step === 4 && !loading"
    class="manage-account-large-bg"
    :style="{ backgroundImage: `url(${images.layoutManageAccountBoxLargeImage})` }"
  >
    <h2 class="title-box mb-2">Preencha os dados</h2>
    <form @submit.prevent="registerForm">
      <h1 class="label mb-0">Nome do personagem</h1>
      <input type="text" name="nome" class="input-text" v-model="characterName" />
      <h1 class="label mt-5 mb-0">Mar</h1>
      <select class="input-select" v-model="sea">
        <option :value="UserCharacterSeaEnum.North" selected>North Blue</option>
        <option :value="UserCharacterSeaEnum.East">East Blue</option>
        <option :value="UserCharacterSeaEnum.South">South Blue</option>
        <option :value="UserCharacterSeaEnum.West">West Blue</option>
      </select>
      <h1 class="label mt-5 mb-0">Raça</h1>
      <select class="input-select" v-model="breed">
        <option :value="UserCharacterBreedEnum.Human">Humano</option>
        <option :value="UserCharacterBreedEnum.Dwarf">Anão</option>
        <option :value="UserCharacterBreedEnum.Giant">Gigante</option>
        <option :value="UserCharacterBreedEnum.Triton" :disabled="isVip === false">
          Tritão (VIP)
        </option>
        <option :value="UserCharacterBreedEnum.Cyborg" :disabled="isVip === false">
          Ciborgue (VIP)
        </option>
      </select>
      <h1 class="label mt-5 mb-0">Classe</h1>
      <select class="input-select" v-model="_class">
        <option :value="UserCharacterClassEnum.Swordsman">Espadachim</option>
        <option :value="UserCharacterClassEnum.Shooter">Atirador</option>
        <option :value="UserCharacterClassEnum.Fighter">Lutador</option>
      </select>
      <div class="mt-5">
        <HomeButtonComponent
          text="Cancelar"
          :color="ButtonColorEnum.Red"
          :func="() => clearFormCharacter()"
          class="mr-4"
          type="button"
        />
        <HomeButtonComponent text="Criar" />
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import images from '@/data/imageData';
import { onMounted, ref } from 'vue';
import { getAvatarImageMini } from '@/utils/avatarUtils';
import HomeButtonComponent from './HomeButtonComponent.vue';
import { ButtonColorEnum } from '@/enum/ButtonColorEnum';
import UserCharacterService from '@/service/UserCharacterService';
import type { IUserCharacter } from '@/interface/IUserCharacter';
import UserService from '@/service/UserService';
import UserCharacterFactionEnum from '@/enum/UserCharacterFactionEnum';
import CharacterService from '@/service/CharacterService';
import type { ICharacter } from '@/interface/ICharacter';
import UserCharacterSeaEnum from '@/enum/UserCharacterSeaEnum';
import UserCharacterBreedEnum from '@/enum/UserCharacterBreedEnum';
import UserCharacterClassEnum from '@/enum/UserCharacterClassEnum';
import type { AxiosError } from 'axios';
import type ICelebrateError from '@/interface/ICelebrateError';

const step = ref(1);
const factionSelected = ref<UserCharacterFactionEnum | null>(null);
const faction = ref<UserCharacterFactionEnum | null>(null);
const characters = ref<ICharacter[]>([]);
const characterId = ref<number | null>(null);
const characterName = ref('');
const sea = ref<UserCharacterSeaEnum>(UserCharacterSeaEnum.North);
const breed = ref<UserCharacterBreedEnum>(UserCharacterBreedEnum.Human);
const _class = ref<UserCharacterClassEnum>(UserCharacterClassEnum.Swordsman);
const isVip = ref(false);
const myCharacters = ref<IUserCharacter[]>([]);
const loading = ref(false);

const emit = defineEmits(['send-message', 'toggle-loading']);

onMounted(async () => {
  await getAllUserCharactersAPI();
  await getUserVIP();
  await getAllCharacterAPI();
});

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

function chooseFaction(selectFaction: UserCharacterFactionEnum): void {
  faction.value = selectFaction;
  goToStep(3);
}

function chooseAvatar(selectCharacter: number): void {
  characterId.value = selectCharacter;
  goToStep(4);
}

function clearFormCharacter(): void {
  goToStep(3);
}

async function registerForm(): Promise<void> {
  if (characterName.value.trim() !== '') {
    loading.value = true;
    emit('toggle-loading', true);
    await createUserCharacterAPI();
  }
}

function scrollToTop(): void {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function selectCharacter(id: string): void {
  alert(id);
}

function getFactionBox(faction: string): string {
  switch (faction) {
    case 'marine':
      return images.layoutCharacterSelectMarineImage;
    case 'pirate':
      return images.layoutCharacterSelectPirateImage;
    case 'revolutionary':
      return images.layoutCharacterSelectRevolutionaryImage;
    default:
      return '';
  }
}

function getFactionButton(faction: string): string {
  switch (faction) {
    case 'marine':
      return images.layoutBlueButtonImage;
    case 'pirate':
      return images.layoutRedButtonImage;
    case 'revolutionary':
      return images.layoutGreenButtonImage;
    default:
      return '';
  }
}

function confirmDeletion(id: string) {
  const confirmMessage =
    'Você tem certeza de que deseja deletar este personagem? O processo é irreversível!';
  const isConfirmed = window.confirm(confirmMessage);
  if (isConfirmed) {
    loading.value = true;
    emit('toggle-loading', true);
    deleteUserCharacterAPI(id);
  }
}

async function getAllUserCharactersAPI(): Promise<void> {
  try {
    const userCharacters = await UserCharacterService.getAll();
    myCharacters.value = userCharacters;
  } catch (err: unknown) {
    //
  } finally {
    //
  }
}

async function getUserVIP(): Promise<void> {
  try {
    const vip = await UserService.getVIP();
    if (vip.vip == null) {
      isVip.value = false;
      return;
    }
    const vipDate = new Date(vip.vip);
    if (vipDate > new Date()) {
      isVip.value = true;
    }
  } catch (err: unknown) {
    //
  } finally {
    //
  }
}

async function getAllCharacterAPI(): Promise<void> {
  try {
    const getAll = await CharacterService.getAll();
    characters.value = getAll;
  } catch (err: unknown) {
    //
  } finally {
    //
  }
}

async function createUserCharacterAPI(): Promise<void> {
  try {
    await UserCharacterService.create({
      characterId: characterId.value!,
      name: characterName.value,
      faction: faction.value!,
      sea: sea.value,
      breed: breed.value,
      class: _class.value
    });
    await getAllUserCharactersAPI();
    characterName.value = '';
    faction.value = null;
    sea.value = UserCharacterSeaEnum.North;
    breed.value = UserCharacterBreedEnum.Human;
    _class.value = UserCharacterClassEnum.Swordsman;
    goToStep(1);
  } catch (err: unknown) {
    const error = err as AxiosError<ICelebrateError>;
    if (error.response && error.response.data) {
      if (error.response.data.validation) {
        emit('send-message', error.response.data.validation.body.message);
        return;
      }
      emit('send-message', error.response.data.message);
    }
  } finally {
    loading.value = false;
    emit('toggle-loading', false);
    scrollToTop();
  }
}

async function deleteUserCharacterAPI(id: string): Promise<void> {
  try {
    await UserCharacterService.delete(id);
    await getAllUserCharactersAPI();
  } catch (err: unknown) {
    //
  } finally {
    loading.value = false;
    emit('toggle-loading', false);
  }
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

.character-select {
  width: 113px;
  height: 114px;
  position: relative;
}

.character-select img {
  width: 107px;
  height: 108px;
  margin-top: 3px;
  margin-left: 3px;
  border-radius: 2px;
  border: 2px solid #dedede;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.3);
}

.character-name {
  font-family: yanone_kaffeesatzregular;
  font-size: 20px;
  color: #fff;
  text-transform: uppercase;
  text-shadow: 0px 2px #111;
  width: 105px;
  height: 32px;
  text-align: center;
  background-repeat: no-repeat;
  position: absolute;
  top: 79px;
  left: 4px;
  line-height: 32px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-left: 3px;
  padding-right: 3px;
}

.character-level {
  border-radius: 3px;
  width: 100px;
  font-size: 11px;
  font-family: Arial;
  color: #fff;
  text-shadow: 0px 1px 0 #000;
  text-align: center;
  margin: 0px 0 0 7px;
  height: 14px;
  line-height: 14px;
}

.character-level.marine {
  background-color: #688ba2;
  box-shadow: 0 1px 0 #335374;
}

.character-level.pirate {
  background-color: #c61316;
  box-shadow: 0 1px 0 #970303;
}

.character-level.revolutionary {
  background-color: #56ad56;
  box-shadow: 0 1px 0 #117a11;
}

.character-delete {
  border-radius: 4px;
  box-shadow: 0 1px 0 #756040;
  font-family: yanone_kaffeesatzregular;
  font-size: 11px;
  color: #fff;
  text-shadow: 0 1px 1px #000;
  padding: 2px 8px 1px;
  margin: 4px 0 0 34px;
  float: left;
  background-color: #b22426;
  border: none;
  cursor: pointer;
  height: 14px;
  line-height: 14px;
}
</style>
@/utils/avatarUtils
