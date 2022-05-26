import "bootstrap/dist/css/bootstrap.min.css"
import { createApp } from 'vue'
import App from './App.vue'
import store from './store';
import router from './router'
import axios from 'axios';
import Vuex from 'vuex';
axios.defaults.baseURL = 'http://localhost:8080/Groep1BankApi/bank/1.0.0/'

axios.defaults.headers.common['Authorization'] = `Bearer ${store.state.token}`;

axios.interceptors.response.use(function (response) {
    return response
}, function (error) {
    console.log(error.response.data)
    if (error.response.status === 401) {
        store.dispatch('logout')
        router.push('/login')
    }
    return Promise.reject(error)
})
const DEFAULT_TITLE = 'BBCBank';
router.beforeEach((to, from, next) => {
    document.title = DEFAULT_TITLE +" | "+ to.meta.title || DEFAULT_TITLE;
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.getters.isLoggedIn) {
            next({ name: 'login' })
        } else {
            next()
        }
    } else if(to.matched.some(record => record.meta.hideForAuth)) {
        if (store.getters.isLoggedIn) {
            next({ name: 'home' })
        } else {
            next()
        }
    } else {
        next() // does not require auth or has to hide for auth, make sure to always call next()!
    }


})






createApp(App).use(router).use(store).use(Vuex).mount('#app')

import "bootstrap/dist/js/bootstrap.js"
