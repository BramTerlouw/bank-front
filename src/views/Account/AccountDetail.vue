<template>
  <MenuBar />
  <div id="content">
    <div class="toolbar-wrapper">
      <b-button-toolbar justify>
        <b-button-group class="mx-1">
          
          <b-button @click="this.$router.push('/accounts/setLimit?iban=' + this.account['iban']);" class="mx-1" variant="outline-light">Set account limit</b-button>
          
          <b-button @click="this.$router.push('/accounts/setPincode?iban=' + this.account['iban']);" class="mx-1" variant="outline-light">Set pincode</b-button>
          
          <b-button @click="this.$router.push('/accounts/setStatus?iban=' + this.account['iban']);" class="employee mx-1" variant="outline-light">Account status</b-button>
        </b-button-group>
        <b-button-group class="mx-1">
          <b-button class="mx-1" variant="outline-light">Transfer</b-button>
        </b-button-group>
      </b-button-toolbar>
    </div>
    <div class="account-wrapper bg-dark">
      <Account :user="this.user" :account="this.account"></Account>
    </div>

    <div class="Account-overview-header">
        <h2>Transactions:</h2>
    </div>
    <div class="transaction-wrapper bg-dark">

  </div>
  </div>
  <FooterBar />
</template>

<script>
import MenuBar from "@/components/MenuBar";
import FooterBar from "@/components/FooterBar";
import Account from "@/components/Account/Account";
import axios from "../../services/AccountService";
export default {
  name: "AccountDetail",
  components: { MenuBar, FooterBar, Account },
  data() {
    return {
      account: Object,
      user: Object,
    };
  },
  async created() {
    try {
      this.account = await axios.getAccountByIban(this.$route.query.iban);
      this.user = await axios.getAccountUser(this.account["user_Id"]);
    } catch (error) {
      this.$router.push('/accounts/home');
    }
  },
  mounted() {
    if(!this.loggedUser["role"].includes(1)){
      this.hideEmployeeItems();
    }
  }, computed: {
    loggedUser() {
      return this.$store.getters.getUser
    }
  },
  methods: {
    hideEmployeeItems(){
      document.getElementsByClassName('employee')[0].remove();
    },
  }
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
  margin: 0 auto;

  border-radius: 10px;
}

.transaction-wrapper {
    width: 70vw;
    height: 500px;
    margin: 10px auto;

    border-radius: 10px;
}

.toolbar-wrapper {
    width: 70vw;
    margin: 20px auto;
}
</style>