<template>
  <button
    class="home-button"
    :style="{ backgroundImage: `url(${getColorImage()})` }"
    @click="handleClick"
  >
    {{ text }}
  </button>
</template>

<script setup lang="ts">
import images from '@/data/imageData';
import { ButtonColorEnum } from '@/enum/ButtonColorEnum';

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  func: {
    type: Function as (arg?: any) => any
  },
  color: {
    type: String as () => ButtonColorEnum,
    default: ButtonColorEnum.Green
  }
});

const getColorImage = () => {
  return props.color === 'green' ? images.layoutGreenButtonImage : images.layoutRedButtonImage;
};

const handleClick = () => {
  if (props.func) {
    props.func();
  }
};
</script>

<style scoped>
.home-button {
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
