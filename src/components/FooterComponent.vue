<template>
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
</template>

<script setup lang="ts">
import images from '@/data/imageData';
</script>

<style scoped>
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
  margin: 0px 25px 10px 0;
}

.footer-flex a {
  text-decoration: underline;
  color: white;
}
</style>
