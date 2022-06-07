import axios from 'axios';
const url = 'https://api.bbcbank.nl/'
export default {

    changeRole(credentials){
        return axios
            .put(url + 'users/'+ credentials.userid +'/role', credentials)
            .then(response => response.data);
    },

    changeUserDetails(credentials){
        return axios
            .put(url + 'users/'+ credentials.userid, credentials)
            .then(response => response.data);
    },

    changeUserActivation(credentials){
        return axios
            .put(url + 'users/'+ credentials.userid + '/activation', credentials)
            .then(response => response.data);
    },
};