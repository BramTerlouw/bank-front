<template>
  <MenuBar />
  <div id="content">
    <div v-if="this.error == ''" class="content-wrapper">
      <div class="account-wrapper bg-dark">
        <Account :user="this.user" :account="this.account"></Account>
      </div>
      <div class="form-wrapper bg-dark p-4">
        <h3>Change account status:</h3>
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group
            id="input-group-1"
            label="activated"
            label-for="input-activated"
            description="Set the status of this account."
        >
        <b-form-select v-model="selected" :options="options"></b-form-select>
        </b-form-group>

        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
      </div>
    </div>
    <div class="error-wrapper" v-if="error">
        <b-alert show dismissible variant="danger">
          {{ error.status }}, {{error.message}}
        </b-alert>
      </div>
    <div class="error-wrapper" v-if="succes">
        <b-alert show dismissible variant="success">
          {{ succes }}
        </b-alert>
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
          { value: 'True', text: 'Active account' },
          { value: 'False', text: 'Closed account' },
        ],
      show: true,
      account: {},
      user: {},
      error: "",
      succes: "",
    };
  },
  methods: {


    async onSubmit() {
      this.error = '';
      this.succes = '';

      try {
        await axios.setStatus(this.account['iban'], {activated: this.selected}).then((res) => {
          this.account['activated'] = res['activated'];
          this.succes = "Account status succesfully changed to " + this.account['activated'];
        })
      } catch (error) {
        this.error = error.response.data;
      }
    },


    onReset() {
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
.error-wrapper {
  width: 40vw;
  margin: 20px auto;
}
</style>