<template>
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
</template>

<script setup lang="ts">
import images from '@/data/imageData';
import { isEventBox, saveEventBox } from '@/utils/localStorageUtils';
import { ref } from 'vue';

const isEventBoxVisible = ref(isEventBox());

const toggleEventBoxVisibility = (): void => {
  isEventBoxVisible.value = !isEventBoxVisible.value;
  saveEventBox(isEventBoxVisible.value.toString());
};
</script>

<style scoped>
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
</style>
