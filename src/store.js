
import Vuex from 'vuex';
import Axios from 'axios';
import createPersistedState from 'vuex-persistedstate';

const getDefaultState = () => {
    return {
        token: '',
        user: Object,
        totalWalletPrice: 0.00
    };
};
export default new Vuex.Store({
    strict: true,
    plugins: [createPersistedState()],
    state: getDefaultState(),
    getters: {
        isLoggedIn: state => {
            return state.token;
        },
        getUser: state => {
            return state.user;
        }
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token;
        },
        SET_USER: (state, user) => {
            state.user = user;
        },
        RESET: state => {
            Object.assign(state, getDefaultState());
        }
    },
    actions: {
        // eslint-disable-next-line no-unused-vars
        setToken: ({ commit, dispatch }, { token }) => {
            commit('SET_TOKEN', token);
            // set auth header
            Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            // eslint-disable-next-line no-unused-vars
        },setUser: ({ commit, dispatch }, { user }) => {
            commit('SET_USER', user);
            // set auth header
        },
        logout: ({ commit }) => {
            commit('RESET', '');
        }
    }
});