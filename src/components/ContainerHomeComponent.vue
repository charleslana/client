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
    <div class="footer-flex">
      <div
        class="footer-container"
        :style="{ backgroundImage: `url(${images.layoutFooterImage})` }"
      ></div>
      <p class="is-flex is-justify-content-end">
        <RouterLink to="/pp">Politica de Privacidade</RouterLink>&nbsp;|&nbsp;
        <RouterLink to="/tos">Termos de Uso</RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import images from '@/data/imageData';
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
  background-repeat: repeat-y;
  margin: 0 auto;
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

.footer-flex {
  width: 939px;
  margin: 0 auto;
}

.footer-container {
  width: 939px;
  height: 160px;
  background-position: top center;
  background-repeat: no-repeat;
  margin: 0 auto;
}

.footer-flex p {
  color: #a1a1a1;
  font-size: 11px;
  margin: 10px 25px 0 0;
}

.footer-flex a {
  text-decoration: underline;
  color: white;
}
</style>
