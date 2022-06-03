<template>
  <MenuBar/>
  <div id="content">
    <div v-if="this.error == ''" class="">
      <div class="Account-overview-header">
        <h2 v-if="showPin">PinCode:</h2>
      </div>
      <b-form @submit="onSubmit" @reset="onReset" v-if="showPin" class="container bg-dark">
        <b-form-group
            id="input-group-1"
            label-for="input-pin"
            description="Enter the Pin of this account."
        >
          <b-form-input
              id="input-pin"
              v-model="this.pin"
              type="text"
              required
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>


      <div v-if="PinCorrect" class="container bg-dark">
        <div class="Account-overview-header">
          <h2>Deposit:</h2>
        </div>
        <deposit></deposit>
        <div class="Account-overview-header">
          <h2>Withdraw:</h2>
        </div>
        <withdraw></withdraw>
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
  </div>
  <FooterBar/>
</template>

<script>
import MenuBar from "@/components/MenuBar";
import FooterBar from "@/components/FooterBar";
import axios from "@/services/AccountService";
import Deposit from "@/components/Transactions/Deposit";
import Withdraw from "@/components/Transactions/Withdraw";

export default {
  name: "ATM",
  components: {Withdraw, Deposit, MenuBar, FooterBar},
  data() {
    return {
      account: {},
      pin: "",
      showPin: true,
      PinCorrect: false,
      error: "",
      succes: "",
    };
  },
  async created() {
    try {
      this.account = await axios.getAccountByIban(this.$route.query.iban);
    } catch (error) {
      this.error = error.response.data;
    }
  },
  methods: {
    async onSubmit() {
      try {
        this.error = '';
        this.succes = '';

        var data =
        console.log(data);
        await axios.authenticateAccount({iban: this.$route.query.iban, pincode: this.pin})
            .then(this.PinCorrect = this.response['isValid']);

        console.log(this.PinCorrect);


        // if (this.account["pin"] === this.pin) {
        //   this.PinCorrect = true;
        //   this.showPin = false;
        // } else this.error = "The pin was not correct"
      } catch (error) {
        this.error = error.response;
        console.log(this.error.message);
      }
    },
    onReset() {
      // Reset our form values
      this.pin = '';
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  }
}
</script>

<style scoped>
.container {
  width: 70vw;
  margin: 0 auto;
  border-radius: 10px;
}
</style>