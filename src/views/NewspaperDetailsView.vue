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
          <div
            class="newspaper-detail"
            :style="{ backgroundImage: `url(${images.newspaperBgImage})` }"
          >
            <div class="newspaper-detail-content">
              <div class="newspaper-title">{{ newspaper.title }}</div>
              <div
                class="newspaper-description"
                v-html="formatBreakLines(newspaper.description)"
              ></div>
              <div class="newspaper-author">
                <img :src="images.swordIconImage" alt="author image" width="8" height="8" />
                Anunciado pelo <b>{{ newspaper.user.fullName }}</b> em
                {{ formatDateToDateTime(newspaper.createdAt, true) }}
              </div>
            </div>
          </div>
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
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import type { INewspaper } from '@/interface/INewspaper';
import NewspaperService from '@/service/NewspaperService';
import { formatDateToDateTime, formatBreakLines } from '@/utils/utils';

const router = useRouter();

const id = router.currentRoute.value.params.id as string;
const newspaper = ref<INewspaper>({
  createdAt: new Date().toISOString(),
  description: '',
  id: 0,
  title: '',
  user: {
    credit: 0,
    fullName: '',
    vip: ''
  }
});

onMounted(() => {
  getNewspaperDetailsAPI();
});

async function getNewspaperDetailsAPI(): Promise<void> {
  try {
    const getNewspaper = await NewspaperService.get(+id);
    newspaper.value = getNewspaper;
  } catch (err: unknown) {
    router.push({ name: 'newspaper' });
  } finally {
    //
  }
}
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

.newspaper-detail {
  width: 715px;
  min-height: 516px;
  height: auto;
  background-repeat: no-repeat;
  display: flex;
  padding-top: 10px;
}

.newspaper-detail-content {
  width: 677px;
  padding: 8px;
  height: auto;
  background: rgba(255, 255, 255, 0.85);
  margin: 20px auto auto;
  border-radius: 4px;
  box-shadow: 0px 0px 1px 1px #cccccc;
  font-size: 13px;
}

.newspaper-title {
  font-family: 'mousememoirs';
  font-size: 32px;
  width: 90%;
  margin: auto;
  font-weight: bold;
  color: black;
}

.newspaper-description {
  font-size: 13px;
  color: #333;
  text-align: justify;
  margin: 0 20px 0 20px;
}

.newspaper-author {
  margin-top: 25px;
  margin-bottom: 30px;
  font-size: 12px;
}
</style>
