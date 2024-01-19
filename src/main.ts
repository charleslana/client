import App from './App.vue';
import Popper from 'vue3-popper';
import router from '@/router';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './assets/main.css';

const app = createApp(App);

app.component('PopperComponent', Popper);
app.use(createPinia());
app.use(router);

app.mount('#app');
