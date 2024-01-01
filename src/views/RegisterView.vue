<template>
  <div>
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
      <div class="container" :style="{ backgroundImage: `url(${images.layoutBgContentImage})` }">
        <div
          class="container-top"
          :style="{ backgroundImage: `url(${images.layoutContentTopImage})` }"
        ></div>
        <div class="container-register">
          <div class="register" :style="{ backgroundImage: `url(${images.layoutRegisterImage})` }">
            <form>
              <div class="card">
                <div class="title">Informações de Login /////////////////</div>
                <div class="flex space-between align-item-center mt-10">
                  <label for="user">Usuário:</label>
                  <input type="text" name="user" />
                </div>
                <div class="flex space-between align-item-center mt-10">
                  <label for="password">Senha:</label>
                  <input type="password" name="password" v-model="password" />
                </div>
                <div class="flex mt-10 space-between">
                  <span>{{ passwordStrengthText }}</span>
                  <div class="bar">
                    <div
                      class="fill"
                      :style="{ width: passwordStrength + '%', backgroundColor: progressBarColor }"
                    ></div>
                  </div>
                </div>
                <div class="flex space-between align-item-center mt-10">
                  <label for="user">E-mail:</label>
                  <input type="email" name="user" />
                </div>
              </div>
              <div class="card text-center">
                <div class="title blue">Informações Adicionais /////////////</div>
                <div class="flex space-between align-item-center mt-10">
                  <label for="fullName">Nome completo:</label>
                  <input type="text" name="fullName" />
                </div>
                <div class="flex space-between align-item-center mt-10">
                  <label for="gender">Gênero:</label>
                  <div>
                    <div class="flex space-between align-item-center mt-10">
                      <label for="maleGender">
                        <input
                          type="radio"
                          id="maleGender"
                          name="gender"
                          value="male"
                          v-model="selectedGender"
                        />
                        Masculino
                      </label>
                      <label for="femaleGender" class="ml-10">
                        <input
                          type="radio"
                          id="femaleGender"
                          name="gender"
                          value="female"
                          v-model="selectedGender"
                        />
                        Feminino
                      </label>
                    </div>
                  </div>
                </div>
                <div class="mt-10">
                  <label for="tos" class="fw-n">
                    <input type="checkbox" id="tos" value="true" />
                    Li e concordo com os <RouterLink to="/tos">Termos de Uso</RouterLink> do jogo.
                  </label>
                </div>
                <button class="register-button mt-10">Continuar registro</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="flex flex-column footer-flex">
        <div class="footer" :style="{ backgroundImage: `url(${images.layoutFooterImage})` }"></div>
        <p class="flex justify-end">
          <RouterLink to="/pp">Politica de Privacidade</RouterLink>&nbsp;|&nbsp;
          <RouterLink to="/tos">Termos de Uso</RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import images from '@/data/imageData';
import { computed, ref } from 'vue';

const password = ref('');
const selectedGender = ref<'male' | 'female'>('male');
const minLength = 6;

const passwordStrength = computed(() => {
  return calculatePasswordStrength(password.value);
});

const progressBarColor = computed(() => {
  return getPasswordStrengthColor(passwordStrength.value);
});

const passwordStrengthText = computed(() => {
  return getPasswordStrengthText(passwordStrength.value);
});

function calculatePasswordStrength(password: string): number {
  const length = password.length;
  if (length === 0) {
    return 0;
  }
  if (length < minLength) {
    return (length / minLength) * 25;
  }
  if (/\d/.test(password) && /[a-zA-Z]/.test(password)) {
    return length >= minLength * 2 ? 100 : 50;
  }
  return 50;
}

function getPasswordStrengthColor(strength: number) {
  if (strength >= 100) {
    return '#00ff00';
  }
  if (strength >= 50) {
    return '#ffff00';
  }
  return '#ff0000';
}

function getPasswordStrengthText(strength: number): string {
  if (strength === 0) {
    return '-';
  }
  if (strength >= 100) {
    return 'Forte';
  }
  if (strength >= 50) {
    return 'Média';
  }
  return 'Fraca';
}
</script>

<style scoped>
.bg {
  background-position: top center;
  background-repeat: repeat, no-repeat;
  height: 100vh;
  min-height: 100%;
}

.container {
  background-repeat: repeat-y;
  margin: 0 auto;
  width: 743px;
  position: relative;
}

.container-top {
  width: 743px;
  height: 56px;
  background-repeat: no-repeat;
}

.container-register {
  padding: 8px 15px;
}

.register {
  width: 716px;
  height: auto;
  background-repeat: no-repeat;
  display: flex;
}

form {
  margin: 0 auto;
  width: 353px;
}

.card {
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.4);
  float: left;
  padding: 20px;
  background: #fff;
  margin: 10px auto;
  width: auto;
  font-size: 12px;
  color: #666;
}

.title {
  font-size: 16px;
  font-family: 'lithos_pro_regular';
  text-transform: uppercase;
  color: #ff8000;
}

label {
  font-weight: bold;
}

input {
  border: 1px solid #eee;
  border-radius: 3px;
  padding: 3px;
  background: #fff;
  color: #5b5958;
}

.bar {
  width: 125px;
  height: 5px;
  border: 1px solid #000000;
  overflow: hidden;
}

.fill {
  height: 100%;
  background-color: #000000;
  transition: width 0.3s ease;
}

.blue {
  color: #3a75b9;
}

.register-button {
  background: linear-gradient(to bottom, rgba(255, 234, 0, 1) 0%, rgba(255, 153, 0, 1) 100%);
  border: 1px solid #ffa100;
  text-shadow: 1px 1px 0px #a37609;
  font-family: yanone_kaffeesatzregular;
  font-size: 18px;
  cursor: pointer;
  color: white;
  padding: 3px;
  border-radius: 3px;
}

.register-button:hover {
  background: radial-gradient(
    ellipse at center,
    rgba(255, 153, 0, 1) 0%,
    rgba(255, 234, 0, 1) 100%
  );
}

.footer-flex {
  width: 939px;
  margin: 0 auto;
  height: 157px;
}

.footer {
  width: 939px;
  height: 160px;
  background-position: top center;
  background-repeat: no-repeat;
  margin: 0 auto;
}

.footer-flex p {
  color: #a1a1a1;
  font-size: 11px;
  margin: 10px 25px 0 0;
}

.footer-flex a {
  text-decoration: underline;
  color: white;
}
</style>
