import axios from 'axios';
const url = 'https://api.bbcbank.nl/'
export default {
    login(credentials) {
        return axios
            .post(url + 'users/login', credentials)
            .then(response => response);
    },

    getCurrentUser(){
        return axios
            .get(url + 'users/current')
            .then(response => response);
    },

    resetPassword(credentials){
        return axios
            .put(url + 'users/'+ credentials.userid +'/password', credentials)
            .then(response => response.data);
    },

    signUp(credentials) {
        return axios
            .post(url + 'users/signup', credentials)
            .then(response => response.data);
    },
};