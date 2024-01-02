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
            <form @submit.prevent="register">
              <div class="card">
                <div class="title">Informações de Login /////////////////</div>
                <div class="flex space-between align-item-center mt-10">
                  <label for="user" :class="{ 'error-label': userError !== '' }">Usuário:</label>
                  <img
                    :src="existUser ? images.layoutIconErrorImage : images.layoutIconOkImage"
                    alt="error icon image"
                    v-show="user !== ''"
                  />
                  <input type="text" name="user" v-model="user" />
                </div>
                <div class="error flex justify-end mt-10" v-show="userError !== ''">
                  {{ userError }}
                </div>
                <div class="flex space-between align-item-center mt-10">
                  <label for="password" :class="{ 'error-label': passwordError !== '' }"
                    >Senha:</label
                  >
                  <input type="password" name="password" v-model="password" />
                </div>
                <div class="error flex justify-end mt-10" v-show="passwordError !== ''">
                  {{ passwordError }}
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
                  <label for="email" :class="{ 'error-label': emailError !== '' }">E-mail:</label>
                  <img
                    :src="existEmail ? images.layoutIconErrorImage : images.layoutIconOkImage"
                    alt="error icon image"
                    v-show="email !== ''"
                  />
                  <input type="email" name="email" v-model="email" />
                </div>
                <div class="error flex justify-end mt-10" v-show="emailError !== ''">
                  {{ emailError }}
                </div>
              </div>
              <div class="card text-center">
                <div class="title blue">Informações Adicionais /////////////</div>
                <div class="flex space-between align-item-center mt-10">
                  <label for="fullName" :class="{ 'error-label': fullNameError !== '' }"
                    >Nome completo:</label
                  >
                  <input type="text" name="fullName" v-model="fullName" />
                </div>
                <div class="error flex justify-end mt-10" v-show="fullNameError !== ''">
                  {{ fullNameError }}
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
                    <input type="checkbox" id="tos" v-model="tos" />
                    Li e concordo com os
                    <RouterLink to="/tos" class="f-bold">Termos de Uso</RouterLink> do jogo.
                  </label>
                  <div class="error text-center mt-10" v-show="tosError !== ''">
                    {{ tosError }}
                  </div>
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
import { computed, ref, watch } from 'vue';

const user = ref('');
const existUser = ref(false);
const userError = ref('');
const password = ref('');
const minPasswordLength = 6;
const passwordError = ref('');
const email = ref('');
const existEmail = ref(false);
const emailError = ref('');
const fullName = ref('');
const fullNameError = ref('');
const selectedGender = ref<'male' | 'female'>('male');
const tos = ref(false);
const tosError = ref('');

const passwordStrength = computed(() => {
  return calculatePasswordStrength(password.value);
});

const progressBarColor = computed(() => {
  return getPasswordStrengthColor(passwordStrength.value);
});

const passwordStrengthText = computed(() => {
  return getPasswordStrengthText(passwordStrength.value);
});

watch(user, (newValue: string) => {
  if (newValue.trim() !== '') {
    existUser.value = true;
  }
  if (newValue.trim() === 'aaa') {
    existUser.value = false;
  }
});

watch(email, (newValue: string) => {
  if (newValue.trim() !== '') {
    existEmail.value = true;
  }
  if (newValue.trim() === 'aaa@aaa.com') {
    existEmail.value = false;
  }
});

function calculatePasswordStrength(password: string): number {
  const length = password.length;
  if (length === 0) {
    return 0;
  }
  if (length < minPasswordLength) {
    return (length / minPasswordLength) * 25;
  }
  if (/\d/.test(password) && /[a-zA-Z]/.test(password)) {
    return length >= minPasswordLength * 2 ? 100 : 50;
  }
  return 50;
}

function getPasswordStrengthColor(strength: number): string {
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
    return '';
  }
  if (strength >= 100) {
    return 'Forte';
  }
  if (strength >= 50) {
    return 'Média';
  }
  return 'Fraca';
}

function register(): void {
  clearValidateRegister();
  if (validateRegister()) {
    return;
  }
  alert('register');
}

function validateRegister(): boolean {
  let error = false;
  if (user.value.trim() === '') {
    userError.value = 'Digite um nome de usuário';
    error = true;
  }
  if (password.value.length < 6) {
    passwordError.value = 'Senha fraca, no mínimo 6 caracteres';
    error = true;
  }
  if (password.value === '') {
    passwordError.value = 'Digite uma senha';
    error = true;
  }
  if (email.value === '') {
    emailError.value = 'Digite um e-mail';
    error = true;
  }
  if (fullName.value.trim() === '') {
    fullNameError.value = 'Digite o nome completo';
    error = true;
  }
  if (!tos.value) {
    tosError.value = 'Você deve aceitar os termos de uso';
    error = true;
  }
  return error;
}

function clearValidateRegister(): void {
  userError.value = '';
  passwordError.value = '';
  emailError.value = '';
  fullNameError.value = '';
  tosError.value = '';
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

.error {
  font-size: 9px;
  color: #ff0000;
  font-weight: bold;
}

.error-label {
  color: #ff0000;
}
</style>
