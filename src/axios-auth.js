import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8080/Groep1BankApi/bank/1.0.0/'
});

export default instance;