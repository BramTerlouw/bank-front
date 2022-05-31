<template>
  <MenuBar />
  <div id="content">
    <div v-if="this.error == ''" class="content-wrapper">
      <div class="account-wrapper bg-dark">
        <Account :user="this.user" :account="this.account"></Account>
      </div>
      <div class="form-wrapper bg-dark p-4">
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
          <b-form-group
            id="input-group-1"
            label="Absolute limit:"
            label-for="input-limit"
            description="Enter new absolute limit of this account."
          >
            <b-form-input
              id="input-limit"
              v-model="form.limit"
              type="number"
              required
            ></b-form-input>
          </b-form-group>

          <b-button type="submit" variant="primary">Submit</b-button>
          <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
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
import Account from "@/components/Account/Account";
import axios from "../../services/AccountService";
export default {
  name: "SetLimit",
  components: { MenuBar, FooterBar, Account },
  data() {
    return {
      form: {
        limit: 11,
      },
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
      this.form.limit = this.account["absolute_Limit"];
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
      this.form.limit = this.account["absolute_Limit"];
    } catch (error) {
      this.error = error.response.data;
    }
  },
};
</script>

<style>
.form-wrapper {
  width: 40vw;
  margin: 0 auto;
  border-radius: 10px;
}
</style>