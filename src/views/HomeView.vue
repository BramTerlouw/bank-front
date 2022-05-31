<template>
  <MenuBar />
  <div id="content">
    <AccountOverview :user="this.user" :accounts="this.accounts"/>
    <div class="total-display bg-dark">
      <div class="total-display-content">
      <span>Total</span>
      <span>€ {{total}}</span>
      </div>
    </div>
  </div>
  <FooterBar />
</template>

<script>
import MenuBar from "@/components/MenuBar";
import FooterBar from "@/components/FooterBar";
import AccountOverview from "../components/Account/AccountOverview.vue";
import axios from '../services/AccountService';
export default {
  name: "HomeView",
  components: { MenuBar, FooterBar, AccountOverview },
  computed: {
    user () {
      return this.$store.getters.getUser
    }
  },
  data() {
    return {
      accounts: [],
      total: 0,
    }
  },
  async created() {
      await axios.getAccountsForUser(this.user['id'])
      .then((res) => {
        this.accounts = res;
        this.accounts.forEach(account => {
          this.total += account['balance'];
        })
      });
  },
}
</script>

<style scoped>



template{
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

td h3 {
  font-size: 20px;
  padding: 10px;
}

.total-display {
  width: 70vw;
  margin: 5px auto;
  padding: 10px 0;

  border-radius: 10px;
}

.total-display-content {
  width: 97%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: grey;
}


</style>