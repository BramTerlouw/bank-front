import axios from 'axios';
const url = 'http://localhost:8080/Groep1BankApi/bank/1.0.0/'
export default {
    getAccountsForUser(id) {
        return axios
            .get(url + 'users/' + id + '/accounts')
            .then(response => response.data);
    },

    getAccountByIban(iban) {
        return axios
            .get(url + 'accounts/' + iban)
            .then(response => response.data);
    },

    getAccountUser(id) {
        return axios
            .get(url + 'users/' + id)
            .then(response => response.data);
    }
};