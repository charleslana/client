<template>
  <ContainerHomeComponent>
    <template v-slot:content>
      <div v-if="success" class="has-text-centered">
        <b>Sua senha foi enviada ao seu email.</b>
      </div>
      <div v-else>
        <h2 class="has-text-weight-bold">Esqueci minha senha!</h2>
        <div class="error" v-show="emailError !== ''">{{ emailError }}</div>
        <form @submit.prevent="forgot">
          <div class="level mt-2">
            <div class="level-left mr-5">
              <label for="email">E-mail:</label>
            </div>
            <div class="level-right">
              <input type="email" id="email" v-model="email" autocomplete="false" />
            </div>
          </div>
          <p v-if="loading">Validando...</p>
          <button v-else class="forgot-button">Enviar Senha</button>
        </form>
      </div>
    </template>
  </ContainerHomeComponent>
</template>

<script setup lang="ts">
import ContainerHomeComponent from '@/components/ContainerHomeComponent.vue';
import { ref } from 'vue';
const loading = ref(false);
const success = ref(false);

const email = ref('');
const emailError = ref('');

function forgot(): void {
  clearValidateForgotPassword();
  if (validateForgotPassword()) {
    return;
  }
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    success.value = true;
  }, 2000);
}

function validateForgotPassword(): boolean {
  if (email.value === '') {
    emailError.value = 'O campo do e-mail obrigatório';
    return true;
  }
  return false;
}

function clearValidateForgotPassword(): void {
  emailError.value = '';
}
</script>

<style scoped>
.error {
  background-color: white;
  color: #ff0000;
  padding: 5px;
}

form {
  width: 242px;
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

.forgot-button {
  background: linear-gradient(to bottom, rgba(255, 234, 0, 1) 0%, rgba(255, 153, 0, 1) 100%);
  border: 1px solid #ffa100;
  text-shadow: 1px 1px 0px #a37609;
  font-family: yanone_kaffeesatzregular;
  font-size: 18px;
  cursor: pointer;
  color: white;
  padding: 3px;
  border-radius: 3px;
  min-width: 100px;
}

.forgot-button:hover {
  background: radial-gradient(
    ellipse at center,
    rgba(255, 153, 0, 1) 0%,
    rgba(255, 234, 0, 1) 100%
  );
}
</style>
