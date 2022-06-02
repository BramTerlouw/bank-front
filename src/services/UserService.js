import axios from 'axios';
const url = 'http://localhost:8080/Groep1BankApi/bank/1.0.0/'
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
};