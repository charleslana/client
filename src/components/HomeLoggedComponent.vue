<template>
  <div
    class="manage-account-bg"
    :style="{ backgroundImage: `url(${images.layoutManageAccountBoxImage})` }"
  >
    <div class="columns is-multiline">
      <div
        class="column character-box is-flex is-align-items-center"
        v-for="index in 12"
        :key="index"
      >
        <img
          class="create-character"
          :src="images.layoutCreateCharacterImage"
          alt="create character image"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import images from '@/data/imageData';
</script>

<style scoped>
.manage-account-bg {
  width: 418px;
  height: 672px;
  padding: 20px;
}

.character-box {
  width: 123px;
  height: 149px;
  opacity: 0.6;
  cursor: pointer;
  margin-bottom: 10px;
  padding: 5px;
}

.character-box:hover {
  background-color: #c9b695;
  border-radius: 5px;
  box-shadow: 5px 5px 10px #ccc;
  opacity: 1;
}

.create-character {
  width: 113px;
  height: 114px;
  max-width: none;
}
</style>
