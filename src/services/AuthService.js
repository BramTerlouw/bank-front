import axios from 'axios';
const url = 'http://localhost:8080/Groep1BankApi/bank/1.0.0/'
export default {
    login(credentials) {
        return axios
            .post(url + 'users/login', credentials)
            .then(response => response.data);
    },
    signUp(credentials) {
        return axios
            .post(url + 'users/signup', credentials)
            .then(response => response.data);
    }
};