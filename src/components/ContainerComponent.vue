<template>
  <div class="content">
    <div
      class="container-wrapper"
      :style="{ backgroundImage: `url(${images.layoutBgContentImage})` }"
    >
      <div
        class="container-top"
        :style="{ backgroundImage: `url(${images.layoutContentTopImage})` }"
      ></div>
      <div class="container-padding">
        <slot name="content"></slot>
      </div>
      <div
        class="container-bottom"
        :style="{ backgroundImage: `url(${images.layoutContentBottomImage})` }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import images from '@/data/imageData';
</script>

<style scoped>
.content {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  position: relative;
}

.container-wrapper {
  background-repeat: repeat-y;
  margin-left: 5px;
  width: 743px;
  position: relative;
}

.container-top {
  width: 743px;
  height: 56px;
  background-repeat: no-repeat;
}

.container-bottom {
  width: 743px;
  height: 45px;
  background-repeat: no-repeat;
  margin: 0 0 -26px 0px;
}

.container-padding {
  padding: 8px 15px;
}
</style>
