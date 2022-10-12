import { createApp } from 'vue';
import './style.css';
import 'element-plus/theme-chalk/dark/css-vars.css';
// import "@/styles/theme/element-dark.scss"; custom darkmode
// import "@/styles/element.scss"; custom element css
import { createPinia } from 'pinia';
import router from './router';
import App from './App.vue';

const app = createApp(App);

app.use(router).use(createPinia()).mount('#app');
