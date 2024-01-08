<template>
  <button
    class="red-button"
    :style="{ backgroundImage: `url(${images.layoutRedButtonImage})` }"
    @click="handleClick"
  >
    Cancelar
  </button>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import images from '@/data/imageData';

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  func: {
    type: Function as (arg?: any) => any,
    required: true
  }
});

const handleClick = () => {
  if (props.func) {
    props.func();
  }
};
</script>

<style scoped>
.red-button {
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
  background-color: transparent;
}
</style>
