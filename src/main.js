import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router';

import Homepage from './components/Homepage.vue';
import Login from './components/Login.vue';

// vuex
import store from './store/store';

const routes = [
    { path: '/', component: Homepage},
    { path: '/login', component: Login},
];

const router = createRouter({
    "history": createWebHistory(),
    routes
})

const app = createApp(App);
app.use(router);

// vuex
app.use(store);

app.mount('#app');