<template>
  <MenuBar/>
  <div id="content">
    <div v-if="this.error == ''" class="content-wrapper">
      <div class="account-wrapper bg-dark">
        <Account :user="this.user" :account="this.account"></Account>
      </div>
      <div class="form-wrapper bg-dark p-4">
        <h3>New Transaction</h3>
        <Transaction></Transaction>
      </div>
    </div>
    <div class="error-wrapper" v-if="error">
      <b-alert show dismissible variant="danger">
        {{ error.status }}, {{ error.message }}
      </b-alert>
    </div>
    <div class="error-wrapper" v-if="succes">
      <b-alert show dismissible variant="success">
        {{ succes }}
      </b-alert>
    </div>
  </div>
  <FooterBar/>
</template>

<script>
import MenuBar from "@/components/MenuBar";
import FooterBar from "@/components/FooterBar";
import Account from "@/components/Account/Account";
import axios from "@/services/AccountService";
import Transaction from "@/components/Transactions/MakeTransaction";

export default {
  name: "newTransaction",
  components: {MenuBar, FooterBar, Account, Transaction},
  data() {
    return {
      account: {},
      user: {},
      error: "",
      succes: "",
    };
  },
  async created() {
    try {
      this.account = await axios.getAccountByIban(this.$route.query.iban);
      this.user = await axios.getAccountUser(this.account["user_Id"]);
    } catch (error) {
      this.error = error.response.data;
    }
  },
}
</script>

<style scoped>

</style>