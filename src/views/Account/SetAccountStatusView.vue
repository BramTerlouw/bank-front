<template>
  <MenuBar />
  <div id="content">
    <div v-if="this.error == ''" class="content-wrapper">
      <div class="account-wrapper bg-dark">
        <Account :user="this.user" :account="this.account"></Account>
      </div>
      <div class="form-wrapper bg-dark p-4">
        <b-form-group
            id="input-group-1"
            label="activated"
            label-for="input-activated"
        >
        <b-form-select v-model="selected" :options="options"></b-form-select>
        </b-form-group>

        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
        
      </div>
    </div>
    <div v-if="error" id="alert-box">
      <div class="alert alert-danger" role="alert">
        {{ error.status }}, {{ error.error }}
      </div>
    </div>
  </div>
  <FooterBar />
</template>

<script>
import MenuBar from "@/components/MenuBar";
import FooterBar from "@/components/FooterBar";
import axios from "../../services/AccountService";
import Account from "@/components/Account/Account";
export default {
  name: "SetAccountStatus",
  components: { MenuBar, FooterBar, Account },
  data() {
    return {
      selected: null,
        options: [
          { value: 'True', text: 'True' },
          { value: 'False', text: 'False' },
        ],
      show: true,
      account: Object,
      user: Object,
      error: "",
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      alert(JSON.stringify(this.form));
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      if (this.account['activated'] == true)
        this.selected = 'True';
      else
        this.selected = 'False';
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
  async created() {
    try {
      this.account = await axios.getAccountByIban(this.$route.query.iban);
      this.user = await axios.getAccountUser(this.account["user_Id"]);

      if (this.account['activated'] == true)
        this.selected = 'True';
      else
        this.selected = 'False';
    } catch (error) {
      this.error = error.response.data;
    }
  },
};
</script>

<style>
</style>