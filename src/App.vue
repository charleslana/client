<template>
  <div>
    <div v-if="showNotification" class="notification is-danger has-text-centered">
      <strong>Não há suporte para mobile ou tablet</strong><br />
      Não é possível jogar com tela de tablet ou mobile! Resolução mínima: largura: 768, altura: 500
    </div>
    <RouterView v-else />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import { onMounted, onUnmounted, ref } from 'vue';

const showNotification = ref(false);

const checkDevice = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const isTabletOrMobile = width < 768 || height < 500;
  showNotification.value = isTabletOrMobile;
};

onMounted(() => {
  checkDevice();
  window.addEventListener('resize', checkDevice);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkDevice);
});
</script>

<style scoped></style>
