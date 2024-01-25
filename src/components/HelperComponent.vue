<template>
  <div class="details-info" :style="{ backgroundImage: `url(${images.layoutDetailsInfoImage})` }">
    <img :src="image" alt="helper image" />
    <div class="info-message">
      <div class="title-helper">{{ title }}</div>
      <div class="description-helper">{{ description }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import images from '@/data/imageData';

defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
});
</script>

<style scoped>
.details-info {
  width: 686px;
  height: 172px;
  background-repeat: no-repeat;
  position: relative;
  margin: 10px 0;
}

.info-message {
  position: absolute;
  width: 410px;
  right: 56px;
  top: 72px;
  height: 70px;
}

.title-helper {
  color: #ff9900;
  font-size: 20px;
  font-weight: bold;
  line-height: 20px;
}

.description-helper {
  padding: 0 10px;
  color: #8c8c8c;
  font-size: 11px;
  margin-bottom: 2px;
  line-height: 11px;
}
</style>
