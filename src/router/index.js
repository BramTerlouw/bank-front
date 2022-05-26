import { createWebHistory, createRouter } from "vue-router";
import Portfolio from "@/views/HomeView";
import Login from "@/views/LoginView";
import Signup from "@/views/SignupView";
import ChangePassword from "@/views/ChangePasswordView";


const routes = [
    { name: 'login', path: '/users/login', component: Login, meta: {hideForAuth: true, title: 'Login'} },
    { name: 'signup', path: '/users/signup', component: Signup, meta: {hideForAuth: true, title: 'Signup'} },
    { name: 'home', path: '/portfolio', component: Portfolio, meta: {requiresAuth: true, title: 'Home'} },
    { name: 'changepassword', path: '/users/changepassword', component: ChangePassword, meta: {requiresAuth: true, title: 'Change Password'} },
    { path: '/:pathMatch(.*)*', component: Login, meta: {hideForAuth: true, title: 'Login'}}
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});


export default router;