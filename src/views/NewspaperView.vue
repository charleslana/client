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
    <div class="container-wrapper">
      <HeaderComponent />
      <SidebarComponent />
      <ContainerComponent>
        <template v-slot:content>
          <h1 v-for="index in 10" :key="index">Lista</h1>
        </template>
      </ContainerComponent>
      <FooterComponent class="is-grid" />
    </div>
  </div>
</template>

<script setup lang="ts">
import images from '@/data/imageData';
import ContainerComponent from '@/components/ContainerComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import HeaderComponent from '@/components/HeaderComponent.vue';
import SidebarComponent from '@/components/SidebarComponent.vue';
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
  margin: 0 auto;
  width: 989px;
  min-height: 100vh;
  position: relative;
}
</style>
