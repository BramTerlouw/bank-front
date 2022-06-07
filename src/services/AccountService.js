import axios from 'axios';
const url = 'https://api.bbcbank.nl/'
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
    },

    getAllAccounts(offset, limit, firstname, lastname) {
        var params = ''
        if (offset != null) {
            params += '&offset=' + offset;
        }
        if (limit != null) {
            params += '&limit=' + limit;
        }
        if (firstname != '') {
            params += '&firstname=' + firstname;
        }
        if (lastname != '') {
            params += '&lastname=' + lastname;
        }
        return axios
            .get(url + 'accounts?' + params)
            .then(response => response.data);
    },

    authenticateAccount(data){
        return axios
            .post(url + 'accounts/authentication', data)
            .then(response => response.data);
    },

    createAccount(data) {
        return axios
            .post(url + 'accounts', data)
            .then(response => response.data);
    },

    setPin(iban, data) {
        return axios
            .put(url + 'accounts/' + iban + '/pincode', data)
            .then(response => response.data);
    },

    setLimit(iban, data) {
        return axios
            .put(url + 'accounts/' + iban, data)
            .then(response => response.data);
    },

    setStatus(iban, data) {
        return axios
            .put(url + 'accounts/' + iban + '/activation', data)
            .then(response => response.data);
    },


};