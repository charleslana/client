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
      <header class="header" :style="{ backgroundImage: `url(${images.headerImage})` }">
        <div
          class="user-header-bg"
          :style="{ backgroundImage: `url(${images.userHeaderBgImage})` }"
        >
          <div class="coin-icon is-flex">
            <img :src="images.coinImage" alt="coin image" class="mr-2" />
            <p>B {{ formatNumberWithZero(5500) }}</p>
          </div>
          <div class="avatar">
            <img :src="getAvatarImageBattle(1, 1)" alt="avatar image" />
          </div>
          <div class="user-info">
            <div class="user-name">Test</div>
            <div class="user-class">{{ getClass(UserCharacterClassEnum.Swordsman) }}</div>
            <div class="user-info-bar">
              <div class="fill" :style="{ width: `${calculateWidthForPercentage(50, 123)}px` }">
                <div
                  class="user-info-bar-mask"
                  :style="{ backgroundImage: `url(${images.userInfoBarImage})` }"
                >
                  50.00%
                </div>
              </div>
            </div>
            <div class="is-flex is-align-items-center">
              <img :src="images.creditImage" alt="credit image" class="mr-1" />
              <div class="user-credit-text mr-1">Créditos:</div>
              <div class="user-credit">{{ formatNumber(0) }}</div>
            </div>
          </div>
          <div
            class="user-level-info"
            :style="{ backgroundImage: `url(${images.userInfoLevelImage})` }"
          >
            <div class="user-level-text">Nível</div>
            <div class="user-level">1</div>
          </div>
        </div>
      </header>
    </div>
  </div>
</template>

<script setup lang="ts">
import images from '@/data/imageData';
import UserCharacterClassEnum from '@/enum/UserCharacterClassEnum';
import { getAvatarImageBattle } from '@/utils/avatarUtils';
import { getClass } from '@/utils/userCharacterUtils';
import { formatNumberWithZero, calculateWidthForPercentage, formatNumber } from '@/utils/utils';
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
  position: relative;
}

.header {
  background-position: top center;
  background-repeat: no-repeat;
  width: 989px;
  height: 161px;
  position: relative;
}

.user-header-bg {
  width: 289px;
  height: 110px;
  background-repeat: no-repeat;
  position: absolute;
  right: 80px;
  top: 17px;
}

.coin-icon {
  width: 133px;
  height: 17px;
  position: absolute;
  left: 113px;
  top: 4px;
}

.coin-icon p {
  font-family: 'yanone_kaffeesatzregular';
  color: white;
  font-size: 14px;
  line-height: 18px;
}

.avatar {
  width: 54px;
  height: 54px;
  position: absolute;
  top: 25px;
  left: 36px;
}

.avatar img {
  width: 54px;
  height: 54px;
  border-radius: 15px;
  border: 1px solid #0b4769;
  box-shadow: 0 0 2px 0 rgb(11, 71, 105);
  object-fit: cover;
}

.user-info {
  width: 120px;
  height: 86px;
  position: absolute;
  top: 19px;
  left: 113px;
}

.user-name {
  font-family: 'yanone_kaffeesatzregular';
  color: #ffc66a;
  font-size: 24px;
  text-shadow: 0 1px 0px #0a5695;
  height: 28px;
}

.user-class {
  font-family: 'yanone_kaffeesatzregular';
  color: #fff;
  text-shadow: 0px 1px 0px #021d38;
  font-size: 14px;
}

.user-info-bar {
  width: 123px;
  height: 17px;
  background-color: #ededed;
}

.user-info-bar .fill {
  background: linear-gradient(to right, #41add2 0%, #046a8d 100%);
  width: 123px;
  height: 17px;
}

.user-info-bar-mask {
  font-size: 11px;
  color: #fff;
  text-shadow: 1px 1px 0px #000;
  padding: 1px 0 0 8px;
  width: 123px;
  height: 17px;
  background-repeat: no-repeat;
}

.user-level-info {
  width: 47px;
  height: 43px;
  background-repeat: no-repeat;
  position: absolute;
  right: 14px;
  bottom: 40px;
}

.user-level-text {
  font-family: 'yanone_kaffeesatzregular';
  font-size: 14px;
  color: #fff;
  text-shadow: 0px 1px 0px #4b5964;
  text-align: center;
}

.user-level {
  font-family: 'yanone_kaffeesatzregular';
  font-size: 30px;
  color: #fff;
  text-shadow: 0px 1px 0px #4b5964;
  position: absolute;
  top: 20px;
  left: 5px;
  width: 37px;
  height: 20px;
  line-height: 20px;
  text-align: center;
}

.user-credit-text {
  font-family: 'yanone_kaffeesatzregular';
  font-size: 12px;
  color: #d7d7d7;
}

.user-credit {
  font-family: 'yanone_kaffeesatzregular';
  color: #ffffff;
  font-size: 16px;
}
</style>
