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
      <ContainerComponent>
        <template v-slot:content>
          <HelperComponent
            title="Treinamento"
            description="Bem vindo ao treinamento. Aqui voce pode se tornar mais forte efetuando um treinamento de 10 minutos. Quanto mais treinamentos forem efetuados mais pontos você ganha para utilizar nos seus atributos."
            :image="images.helperTrainingImage"
          />
          <div
            class="training-bg"
            :style="{ backgroundImage: `url(${images.layoutTrainingPointsImage})` }"
          ></div>
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
import HelperComponent from '@/components/HelperComponent.vue';
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

.training-bg {
  width: 696px;
  height: 331px;
  background-position: top left;
  background-repeat: no-repeat;
  padding: 10px 10px 0;
}
</style>
