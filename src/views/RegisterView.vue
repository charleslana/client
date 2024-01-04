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
    <div
      class="register-container"
      :style="{ backgroundImage: `url(${images.layoutBgContentImage})` }"
    >
      <div
        class="container-top"
        :style="{ backgroundImage: `url(${images.layoutContentTopImage})` }"
      ></div>
      <div class="register-padding">
        <div class="register" :style="{ backgroundImage: `url(${images.layoutRegisterImage})` }">
          <form @submit.prevent="register">
            <div class="register-card">
              <div class="register-title">Informações de Login /////////////////</div>
              <div class="is-flex is-justify-content-space-between is-align-items-center mt-2">
                <label for="user" :class="{ 'error-label': userError !== '' }">Usuário:</label>
                <img
                  :src="existUser ? images.layoutIconErrorImage : images.layoutIconOkImage"
                  alt="error icon image"
                  v-show="user !== ''"
                />
                <input type="text" id="user" v-model="user" />
              </div>
              <div class="error is-flex is-justify-content-flex-end mt-2" v-show="userError !== ''">
                {{ userError }}
              </div>
              <div class="is-flex is-justify-content-space-between is-align-items-center mt-2">
                <label for="password" :class="{ 'error-label': passwordError !== '' }"
                  >Senha:</label
                >
                <input type="password" id="password" v-model="password" />
              </div>
              <div
                class="error is-flex is-justify-content-flex-end mt-2"
                v-show="passwordError !== ''"
              >
                {{ passwordError }}
              </div>
              <div class="is-flex is-justify-content-space-between mt-2">
                <span>{{ passwordStrengthText }}</span>
                <div class="bar">
                  <div
                    class="fill"
                    :style="{ width: passwordStrength + '%', backgroundColor: progressBarColor }"
                  ></div>
                </div>
              </div>
              <div class="is-flex is-justify-content-space-between is-align-items-center mt-2">
                <label for="email" :class="{ 'error-label': emailError !== '' }">E-mail:</label>
                <img
                  :src="existEmail ? images.layoutIconErrorImage : images.layoutIconOkImage"
                  alt="error icon image"
                  v-show="email !== ''"
                />
                <input type="email" id="email" v-model="email" autocomplete="false" />
              </div>
              <div
                class="error is-flex is-justify-content-flex-end mt-2"
                v-show="emailError !== ''"
              >
                {{ emailError }}
              </div>
            </div>
            <div class="register-card text-center">
              <div class="register-title blue">Informações Adicionais /////////////</div>
              <div class="is-flex is-justify-content-space-between is-align-items-center mt-2">
                <label for="fullName" :class="{ 'error-label': fullNameError !== '' }"
                  >Nome completo:</label
                >
                <input type="text" id="fullName" v-model="fullName" />
              </div>
              <div
                class="error is-flex is-justify-content-flex-end mt-2"
                v-show="fullNameError !== ''"
              >
                {{ fullNameError }}
              </div>
              <div class="is-flex is-justify-content-space-between is-align-items-center mt-2">
                <label for="gender">Gênero:</label>
                <div class="is-flex is-justify-content-space-between is-align-items-center mt-2">
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
                  <label for="femaleGender" class="ml-2">
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
              <div class="has-text-centered mt-2">
                <label for="tos" class="has-text-weight-normal">
                  <input type="checkbox" id="tos" v-model="tos" />
                  Li e concordo com os
                  <RouterLink to="/tos" class="has-text-weight-bold">Termos de Uso</RouterLink> do
                  jogo.
                </label>
                <div class="error has-text-centered mt-2" v-show="tosError !== ''">
                  {{ tosError }}
                </div>
              </div>
              <div class="has-text-centered">
                <button class="register-button mt-2">Continuar registro</button>
              </div>
            </div>
          </form>
        </div>
        <!-- <h1 v-for="index in 100" :key="index">Lista</h1> -->
      </div>
    </div>
    <div class="footer-flex">
      <div
        class="register-footer"
        :style="{ backgroundImage: `url(${images.layoutFooterImage})` }"
      ></div>
      <p class="is-flex is-justify-content-end">
        <RouterLink to="/pp">Politica de Privacidade</RouterLink>&nbsp;|&nbsp;
        <RouterLink to="/tos">Termos de Uso</RouterLink>
      </p>
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
  background-repeat: no-repeat;
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  position: relative;
}

.register-container {
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

.register-padding {
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

.register-card {
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.4);
  float: left;
  padding: 20px;
  background: #fff;
  margin: 10px auto;
  width: auto;
  font-size: 12px;
  color: #666;
}

.register-title {
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
}

.register-footer {
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
