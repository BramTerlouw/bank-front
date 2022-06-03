<template>
  <MenuBar />
  <div id="content">
    <div v-if="this.error == ''" class="content-wrapper">
      <div class="account-wrapper bg-dark">
        <Account :user="this.user" :account="this.account"></Account>
      </div>
      <div class="form-wrapper bg-dark p-4">
        <h3>Change account pincode:</h3>
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
          <b-form-group
            id="input-group-1"
            label="oldPin"
            label-for="input-oldPin"
            description="Enter old pincode of this account."
          >
            <b-form-input
              id="input-oldPin"
              v-model="form.oldPin"
              type="text"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-2"
            label="newPin"
            label-for="input-newPin"
            description="Enter new pincode of this account."
          >
            <b-form-input
              id="input-newPin"
              v-model="form.newPin"
              type="text"
              required
            ></b-form-input>
          </b-form-group>

          <b-button type="submit" variant="primary">Submit</b-button>
          <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
      </div>
  </div>
  <div class="error-wrapper" v-if="succes">
        <b-alert show dismissible variant="success">
          {{ succes }}
        </b-alert>
      </div>
      <div class="error-wrapper" v-if="error">
        <b-alert show dismissible variant="danger">
          {{ error.status }}, {{error.message}}
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
  name: "SetPin",
  components: { MenuBar, FooterBar, Account },
  data() {
    return {
      form: {
        oldPin: "",
        newPin: "",
      },
      show: true,
      account: {},
      user: {},
      error: "",
      succes: "",
    };
  },
  methods: {
    
    
    async onSubmit() {
      try {
        this.error = '';
        this.succes = '';

        await axios
          .setPin(this.account["iban"], {
            oldPincode: this.form.oldPin,
            newPincode: this.form.newPin,
          })
          .then((res) => {
            this.account["pin"] = res["newPincode"];
            this.succes = "Pincode succesfully changed to " + res["newPincode"];

            this.form.oldPin = "";
            this.form.newPin = "";
            if (this.$store.getters.getUser["role"].includes(1)) {
              this.form.oldPin = res["newPincode"];
            }
          })
      } catch (error) {
        this.error = error.response.data;
        console.log(this.error.message);
      }
    },
    
    
    onReset() {
      // Reset our form values
      this.form.oldPin = "";
      this.form.newPin = "";
      if (this.$store.getters.getUser["role"].includes(1)) {
        this.form.oldPin = this.account["pin"];
      }
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