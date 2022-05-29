import { createWebHistory, createRouter } from "vue-router";
import Portfolio from "@/views/HomeView";
import Login from "@/views/LoginView";
import Signup from "@/views/SignupView";
import ChangePassword from "@/views/ChangePasswordView";
import userProfile from "@/views/UserProfile";
import userManagement from "@/views/UserManagement";

const routes = [
    { name: 'login', path: '/users/login', component: Login, meta: {hideForAuth: true, title: 'Login'} },
    { name: 'signup', path: '/users/signup', component: Signup, meta: {hideForAuth: true, title: 'Signup'} },
    { name: 'home', path: '/home', component: Portfolio, meta: {requiresAuth: true, title: 'Home'} },
    { name: 'changepassword', path: '/users/changepassword', component: ChangePassword, meta: {requiresAuth: true, title: 'Change Password'} },
    { name: 'userprofile', path: '/users/profile', component: userProfile, meta: {requiresAuth: true, title: 'User profile'} },
    { name: 'usermanagement', path: '/usermanagement', component: userManagement, meta: {requiresAuth: true, requiresEmployeeRole: true, title: 'User Management'} },
    { path: '/:pathMatch(.*)*', component: Login, meta: {hideForAuth: true, title: 'Login'}}
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});


export default router;