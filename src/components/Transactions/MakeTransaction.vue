<template>
  <b-form @submit="onSubmit" @reset="onReset" v-if="show">
    <b-form-group
        v-if="this.$store.getters.getUser['role'].includes(1)"
        id="input-group-1"
        label="activated"
        label-for="input-ibanFrom"
        description="The Account to Transfer From."
    >
      <b-form-input
          id="input-ibanFrom"
          v-model="form.ibanFrom"
          type="text"
          required
      ></b-form-input>

    </b-form-group>
    <b-form-group
        id="input-group-2"
        label="activated"
        label-for="input-ibanTo"
        description="The Account to Transfer too."
    >
      <b-form-input
          id="input-ibanTo"
          v-model="form.ibanTo"
          type="text"
          required
      ></b-form-input>

    </b-form-group>
    <b-form-group
        id="input-group-3"
        label="activated"
        label-for="input-amount"
        description="The Amount to Transfer."
    >
      <b-form-input
          id="input-amount"
          v-model="form.amount"
          type="text"
          required
      ></b-form-input>
    </b-form-group>

    <b-form-group
        id="input-group-3"
        label="activated"
        label-for="input-pin"
        description="The pin of the account."
    >
      <b-form-input
          id="input-pin"
          v-model="form.pin"
          type="text"
          required
      ></b-form-input>
    </b-form-group>

    <b-button type="submit" variant="primary">Submit</b-button>
    <b-button type="reset" variant="danger">Reset</b-button>
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
  </b-form>

</template>

<script>
import {BFormInput} from "bootstrap-vue-3";
import axios from "@/services/TransactionService";

export default {
  name: "Transaction",
  components: {BFormInput},
  data() {
    return {
      form: {
        ibanFrom: this.$route.query.iban,
        ibanTo: "",
        amount: "",
        pin: "",
      },
      error: '',
      succes: '',
      show: true,
    }
  },
  async created() {
    try {
      this.form.ibanFrom = this.$route.query.iban;
    } catch (error) {
      this.error = error.response.data;
    }
  },
  methods: {
    async onSubmit() {
      try {
        this.error = '';
        this.succes = '';

        await axios
            .doTransaction({
                  ibanFrom: this.form.ibanFrom,
                  ibanTo: this.form.ibanTo,
                  amount: this.form.amount,
                  pin: this.form.pin,
                }
            )
            //.then(this.$router.push('/accounts/detail?iban=' + this.form.ibanFrom))
            .then((res) => this.succes = "Transaction from " + res['ibanFrom'] + " to " + res['ibanTo'] + " succeeded");
      } catch (error) {
        this.error = error.response.data;
        console.log(this.error.message);
      }
    },
    onReset() {

      // Reset our form values
      this.form.ibanFrom = this.$route.query.iban;
      this.form.ibanTo = '';
      this.form.amount = '';
      this.form.pin = '';
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
.error-wrapper {
  width: 100%;
  margin: 10px auto;
}
</style>