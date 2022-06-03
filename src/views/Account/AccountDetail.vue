<template>
  <MenuBar/>
  <div id="content">
    <div v-if="this.error == ''" class="content-wrapper">
      <div class="toolbar-wrapper">
        <b-button-toolbar justify>
          <b-button-group class="mx-1">
            <b-button
                @click="
                this.$router.push(
                  '/accounts/setLimit?iban=' + this.account['iban']
                )
              "
                v-if="!disableEmployeeButtons()"
                class="employee mx-1"
                variant="outline-light"
            >Set account limit
            </b-button
            >

            <b-button
                @click="
                this.$router.push(
                  '/accounts/setPincode?iban=' + this.account['iban']
                )
              "
                class="mx-1"
                variant="outline-light"
            >Set pincode
            </b-button
            >

            <b-button
                @click="
                this.$router.push(
                  '/accounts/setStatus?iban=' + this.account['iban']
                )
              "
                v-if="!disableEmployeeButtons()"
                class="employee mx-1"
                variant="outline-light"
            >Account status
            </b-button
            >
            <b-button
                @click="
                this.$router.push(
                  '/accounts/atm?iban='+ this.account['iban']
                )
              "
                class=" mx-1"
                variant="outline-light"
            >ATM
            </b-button>
          </b-button-group>
          <b-button-group class="mx-1">
            <b-button
                class="mx-1"
                variant="outline-light"
                @click="
                this.$router.push(
                  '/transactions/newTransaction?iban=' + this.account['iban']
                )
              "
            >Transfer
            </b-button>
          </b-button-group>
        </b-button-toolbar>
      </div>
      <div class="account-wrapper bg-dark">
        <Account :user="this.user" :account="this.account"></Account>
      </div>

      <div class="Account-overview-header">
        <h2>Transactions:</h2>
        <div class="account-section section-balance" :class="{neg: this.account['balance'] < 0 }">
          <caption>User Day limit: € {{ this.user['day_limit'] }}</caption>
        </div>
      </div>

      <div class="transaction-wrapper bg-dark">
        <template v-for="transaction in this.transactions" :key="transaction">
          <Transaction :transaction="transaction"></Transaction>
        </template>
      </div>
    </div>
    <div v-if="error" id="alert-box">
      <div class="alert alert-danger" role="alert">
        {{ error.status }}, {{ error.error }}
      </div>
    </div>
  </div>
  <FooterBar/>
</template>

<script>
import MenuBar from "@/components/MenuBar";
import FooterBar from "@/components/FooterBar";
import Account from "@/components/Account/Account";
import axios from "../../services/AccountService";
import axios2 from "../../services/TransactionService";
import Transaction from "@/components/Transactions/Transaction";

export default {
  name: "AccountDetail",
  components: {MenuBar, FooterBar, Account, Transaction},
  data() {
    return {
      account: {},
      user: {},
      transactions: {},
      error: "",
    };
  },
  async created() {
    try {
      this.account = await axios.getAccountByIban(this.$route.query.iban);
      this.user = await axios.getAccountUser(this.account["user_Id"]);
      await axios2.getAllTransactionsFromAccount(this.account["iban"])
          .then((res) => {
            this.transactions = res;
          });
    } catch (error) {
      this.error = error.response.data;
    }
  },
  computed: {
    loggedUser() {
      return this.$store.getters.getUser;
    },
  },
  methods: {
    disableEmployeeButtons() {
      if (!this.loggedUser["role"].includes(1)) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style>
template {
  display: flex;
  flex-direction: column;
  background-color: #262739;
}

#content {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  background-color: #262739;
}

.account-wrapper {
  width: 70vw;
  margin: 20px auto;
  padding: 1px;

  border-radius: 10px;
}

.transaction-wrapper {
  width: 70vw;
  min-height: 500px;
  margin: 10px auto;
  padding: 1px;
  border-radius: 10px;
}

.toolbar-wrapper {
  width: 70vw;
  margin: 20px auto;
}
</style>