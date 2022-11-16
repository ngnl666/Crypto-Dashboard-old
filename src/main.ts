import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './style.css';
import 'element-plus/theme-chalk/dark/css-vars.css';
import piniaPersist from 'pinia-plugin-persist';
import router from './router';
import App from './App.vue';

const pinia = createPinia();
pinia.use(piniaPersist);

const app = createApp(App);

app.use(router).use(pinia).mount('#app');
