import { createWebHistory, createRouter } from "vue-router";
import Portfolio from "@/views/HomeView";
import Login from "@/views/LoginView";
import Signup from "@/views/SignupView";
import ChangePassword from "@/views/ChangePasswordView";
import userProfile from "@/views/UserProfile";
import userManagement from "@/views/UserManagement";
import accountManagement from "@/views/Account/AccountManagementView";
import createAccount from "@/views/Account/CreateAccountView";
import AccountDetail from "@/views/Account/AccountDetail";

import setLimit from "@/views/Account/SetLimitView";
import setPin from "@/views/Account/SetPinView";
import setAccountStatus from "@/views/Account/SetAccountStatusView";

const routes = [
    { name: 'login', path: '/users/login', component: Login, meta: {hideForAuth: true, title: 'Login'} },
    { name: 'signup', path: '/users/signup', component: Signup, meta: {hideForAuth: true, title: 'Signup'} },
    { name: 'home', path: '/home', component: Portfolio, meta: {requiresAuth: true, title: 'Home'} },
    { name: 'changepassword', path: '/users/changepassword', component: ChangePassword, meta: {requiresAuth: true, title: 'Change Password'} },
    { name: 'userprofile', path: '/users/profile', component: userProfile, meta: {requiresAuth: true, title: 'User profile'} },
    { name: 'usermanagement', path: '/usermanagement', component: userManagement, meta: {requiresAuth: true, requiresEmployeeRole: true, title: 'User Management'} },
    { name: 'accountmanagement', path: '/accountmanagement', component: accountManagement, meta: {requiresAuth: true, requiresEmployeeRole: true, title: 'Account Management'} },
    { name: 'accountDetail', path: '/accounts/detail', component: AccountDetail, meta: {requiresAuth: true, requiresEmployeeRole: false, title: 'Account details'} },
    { name: 'createAccount', path: '/accounts/create', component: createAccount, meta: {requiresAuth: true, requiresEmployeeRole: true, title: 'Create an account'} },
    { name: 'setLimit', path: '/accounts/setLimit', component: setLimit, meta: {requiresAuth: true, requiresEmployeeRole: false, title: 'Set Limit'} },
    { name: 'setPin', path: '/accounts/setPincode', component: setPin, meta: {requiresAuth: true, requiresEmployeeRole: false, title: 'Set Pincode'} },
    { name: 'setAccountStatus', path: '/accounts/setStatus', component: setAccountStatus, meta: {requiresAuth: true, requiresEmployeeRole: true, title: 'Set status'} },
    { path: '/:pathMatch(.*)*', component: Login, meta: {hideForAuth: true, title: 'Login'}}
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});


export default router;