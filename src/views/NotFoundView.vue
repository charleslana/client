<template>
  <div class="not-found-view">
    <div
      class="background"
      :style="{
        backgroundImage: `linear-gradient(
          180deg,
          rgba(0, 0, 0, 0.5) 0%,
          rgba(0, 0, 0, 0.5) 35%,
          rgba(0, 0, 0, 0.5) 100%
        ), url(${images.errorImage})`
      }"
    >
      <div class="content">
        <h1 class="is-size-1">Bancando o espertinho é?</h1>
        <p class="is-size-3">Não existe acesso nesta ação</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import images from '@/data/imageData';
</script>

<style scoped>
.not-found-view {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.background {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
}

.content {
  text-align: center;
}

h1 {
  margin-bottom: 20px;
  color: white;
}

p {
  color: white;
}
</style>
