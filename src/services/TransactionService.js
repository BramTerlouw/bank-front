import axios from 'axios';
const url = 'http://localhost:8080/Groep1BankApi/bank/1.0.0/'
export default {
    doTransaction(data){
        return axios
            .post(url + "transactions", data)
            .then(response => response.data);
    },
    getAllTransactions(offset, limit, start_date, end_date, ibanFrom, ibanTo, balance_operator, Balance){
        var params = ''
        if (offset != null) {
            params += '&offset=' + offset;
        }
        if (limit != null) {
            params += '&limit=' + limit;
        }
        if (start_date != null) {
            params += '&start_date=' + start_date;
        }
        if (end_date != null) {
            params += '&end_date=' + end_date;
        }
        if (ibanFrom != null) {
            params += '&IBAN_From=' + ibanFrom;
        }
        if (ibanTo != null) {
            params += '&IBAN_To=' + ibanTo;
        }
        if (balance_operator != null) {
            params += '&balance operator=' + balance_operator;
        }
        if (Balance != null) {
            params += '&Balance=' + Balance;
        }
        return axios
            .get(url + "transactions?" + params)
            .then(response => response.data);
    },
    deposit(iban ,data){
        return axios
            .post(url + "accounts/"+ iban +"/deposit", data)
            .then(response => response.data);
    },
    withdraw(iban, data){
        return axios
            .post(url + "accounts/"+ iban +"/withdraw", data)
            .then(response => response.data);
    },
    getAllTransactionsFromAccount(iban){
        return axios
            .get(url + "accounts/"+ iban +"/transactions")
            .then(response => response.data);
    }
}