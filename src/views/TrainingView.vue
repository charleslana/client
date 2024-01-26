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
          >
            <div class="training-box">
              <div class="training-text">
                Aqui você pode realizar o seu <span>treinamento básico</span>!
              </div>
              <div class="training-bar">
                <button class="training-button">Treinar!</button>
                <div class="training-experience">75 / 250</div>
                <div class="training-experience-bar">
                  <div
                    class="fill"
                    :style="{
                      width: `${calculateWidthForPercentage(calculatePercentage(75, 250), 304)}px`
                    }"
                  ></div>
                </div>
                <PopperComponent arrow content="Necessário Nv. 40" hover placement="top">
                  <button class="training-button-advanced">Avançado »</button>
                </PopperComponent>
              </div>
            </div>
            <div
              class="training-attribute"
              :style="{ backgroundImage: `url(${images.layoutTrainingAttributeImage})` }"
            >
              <p>
                Você possui <span>{{ availablePointsForDisplay }} pontos</span> restantes para serem
                utilizados.
              </p>
              <div class="training-wrapper">
                <div v-for="(attribute, key) in attributes" :key="key" class="training-bar">
                  <div class="attribute is-flex">
                    <img :src="attribute.image" :alt="`${key} icon`" width="18" height="18" />
                    <div class="text">{{ attribute.name }}</div>
                  </div>
                  <div class="training-point">{{ attribute.point }}</div>
                  <div class="training-experience-bar">
                    <div
                      class="fill"
                      :style="{
                        width: `${calculateWidthForPercentage(
                          calculatePercentage(100, 100),
                          283
                        )}px`
                      }"
                    ></div>
                  </div>
                  <input
                    type="text"
                    v-model="attribute.value.value"
                    @input="handleInput(key)"
                    class="training-input"
                    placeholder="0"
                  />
                  <button
                    class="training-button"
                    @click="decrease(key)"
                    :disabled="parseInt(attribute.value.value) <= 0"
                  >
                    -
                  </button>
                  <button
                    class="training-button"
                    @click="increase(key)"
                    :disabled="parseInt(attribute.value.value) >= 999"
                  >
                    +
                  </button>
                </div>
              </div>
              <button class="training-button" v-if="isConfirmVisible" @click="confirm">
                Confirmar
              </button>
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
import HelperComponent from '@/components/HelperComponent.vue';
import { calculateWidthForPercentage, calculatePercentage } from '@/utils/utils';
import { ref, type Ref } from 'vue';

enum AttributeType {
  Strength = 'strength',
  Dexterity = 'dexterity',
  Intelligence = 'intelligence',
  Resistance = 'resistance'
}

interface Attribute {
  value: Ref<string>;
  image: string;
  name: string;
  point: number;
}

const attributes: { [key in AttributeType]: Attribute } = {
  [AttributeType.Strength]: {
    value: ref('0'),
    image: images.iconStrengthImage,
    name: 'Força',
    point: 1
  },
  [AttributeType.Dexterity]: {
    value: ref('0'),
    image: images.iconDexterityImage,
    name: 'Destreza',
    point: 1
  },
  [AttributeType.Intelligence]: {
    value: ref('0'),
    image: images.iconIntelligenceImage,
    name: 'Inteligência',
    point: 1
  },
  [AttributeType.Resistance]: {
    value: ref('0'),
    image: images.iconResistanceImage,
    name: 'Resistência',
    point: 1
  }
};

const attributePointAvailable = ref<number>(3);
const availablePointsForDisplay = ref<number>(attributePointAvailable.value);
const isConfirmVisible = ref<boolean>(false);

const handleInput = (key: AttributeType) => {
  let trimmedValue = attributes[key].value.value.trim();
  trimmedValue = trimmedValue.replace(/^0+(?=\d)/, '');
  if (!/^\d*$/.test(trimmedValue)) {
    trimmedValue = trimmedValue.slice(0, -1);
  }
  let intValue = parseInt(trimmedValue);
  if (intValue < 0) {
    attributes[key].value.value = '0';
  } else if (intValue > 999) {
    attributes[key].value.value = '999';
    intValue = 999;
  } else {
    attributes[key].value.value = trimmedValue;
  }
  isConfirmVisible.value = trimmedValue !== '' && intValue > 0 && intValue < 1000;
};

const increase = (key: AttributeType) => {
  const totalUsedPoints = getTotalUsedPoints();
  if (totalUsedPoints < attributePointAvailable.value) {
    const value = parseInt(attributes[key].value.value) + 1;
    attributes[key].value.value = value.toString();
    isConfirmVisible.value = true;
  }
};

const decrease = (key: AttributeType) => {
  const value = parseInt(attributes[key].value.value) - 1;
  attributes[key].value.value = value.toString();
  const totalUsedPoints = getTotalUsedPoints();
  if (totalUsedPoints === 0) {
    isConfirmVisible.value = false;
  }
};

const getTotalUsedPoints = () => {
  let total = 0;
  for (const key in attributes) {
    total += parseInt(attributes[key as AttributeType].value.value);
  }
  return total;
};

const confirm = () => {
  alert(
    `${attributes.strength.value.value} | ${attributes.dexterity.value.value} | ${attributes.intelligence.value.value} | ${attributes.resistance.value.value}`
  );
};
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
  min-height: 331px;
  background-position: top left;
  background-repeat: no-repeat;
  padding: 10px 10px 0;
  position: relative;
}

.training-box {
  width: 696px;
}

.training-text {
  color: #909090;
  font-size: 12px;
  margin: 69px 0 0 147px;
  padding: 0;
}

.training-text span {
  color: #df2626;
}

.training-bar {
  border-radius: 4px;
  background: #7f1e18;
  box-shadow: inset 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
  width: 559px;
  height: 33px;
  margin: 6px 0 0 115px;
}

.training-button {
  box-shadow: inset 0px 0px 7px 0px rgba(0, 0, 0, 0.5);
  font-family: 'yanone_kaffeesatzregular';
  font-size: 17px;
  color: #fff;
  text-shadow: 1px 1px 1px #a87c20;
  width: 89px;
  height: 29px;
  margin: 2px 1px 2px 3px;
  float: left;
  padding: 0;
  border: 0;
  cursor: pointer;
  background: linear-gradient(to bottom, #d9a533 0%, #b8861e 100%);
  border-radius: 4px;
  text-align: center;
  line-height: 30px;
}

.training-button:hover {
  background: linear-gradient(to bottom, #d89f24 0%, #b77a00 100%);
}

.training-experience {
  background: none repeat scroll 0 0 rgba(0, 0, 0, 0.17);
  color: #ffffff;
  float: left;
  font-family: 'yanone_kaffeesatzregular';
  font-size: 12px;
  height: 31px;
  padding: 8px 0 0 6px;
  text-align: center;
  text-shadow: 1px 1px 0 #541410;
  width: 65px;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
}

.training-experience-bar {
  background: #4d0602;
  width: 308px;
  height: 31px;
  border-radius: 4px;
  float: left;
  padding: 2px;
}

.training-experience-bar .fill {
  max-width: 304px;
  height: 29px;
  border-radius: 4px;
  background: linear-gradient(to right, #bad79c 0%, #a3e165 100%);
}

.training-button-advanced {
  min-width: 89px;
  text-align: center;
  border-radius: 4px;
  box-shadow: inset 0px 0px 7px 0px rgba(0, 0, 0, 0.5);
  width: 89px;
  height: 29px;
  margin: 2px 3px 2px 1px;
  float: left;
  padding: 0 0 0 0;
  color: #fff;
  cursor: pointer;
  background: linear-gradient(to bottom, rgba(255, 234, 0, 1) 0%, rgba(255, 153, 0, 1) 100%);
  border: 1px solid #ffa100;
  text-shadow: 1px 1px 0px #a37609;
  font-family: 'yanone_kaffeesatzregular';
  font-size: 18px;
}

.training-button-advanced:hover {
  background: radial-gradient(
    ellipse at center,
    rgba(255, 153, 0, 1) 0%,
    rgba(255, 234, 0, 1) 100%
  );
}

.training-attribute {
  width: 640px;
  height: 480px;
  float: right;
  background-repeat: no-repeat;
  margin: 12px -120px 0 0;
}

.training-attribute p {
  color: #909090;
  font-size: 12px;
  margin: 50px 0 0 13px;
  padding: 0;
}

.training-attribute span {
  color: #df2626;
}

.training-wrapper {
  margin: 49px 8px 0 -264px;
}

.training-bar .attribute {
  float: left;
  width: 90px;
  font-size: 17px;
  color: #fff;
  font-family: 'yanone_kaffeesatzregular';
  text-shadow: 1px 1px 0 #541410;
  padding: 0px 0 0 6px;
  align-items: center;
}

.training-attribute .attribute .text {
  float: left;
  width: 90px;
  font-size: 17px;
  color: #fff;
  font-family: 'yanone_kaffeesatzregular';
  text-shadow: 1px 1px 0 #541410;
  padding: 6px 0 0 6px;
}

.training-point {
  background: none repeat scroll 0 0 rgba(0, 0, 0, 0.17);
  color: #ffffff;
  float: left;
  font-family: 'yanone_kaffeesatzregular';
  font-size: 12px;
  height: 31px;
  padding: 8px 0 0 0px;
  text-align: center;
  text-shadow: 1px 1px 0 #541410;
  width: 45px;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
}

.training-wrapper .training-experience-bar {
  width: 283px;
}

.training-wrapper .training-experience-bar .fill {
  max-width: 281px;
}

.training-wrapper .training-button {
  width: 40px;
}

.training-input {
  float: left;
  width: 50px;
  height: 31px;
  font-family: 'yanone_kaffeesatzregular';
  font-size: 15px;
  background: none repeat scroll 0 0 rgba(0, 0, 0, 0.17);
  color: #ffffff;
  border: none;
  text-align: center;
}

.training-input::placeholder {
  color: white;
}
</style>
