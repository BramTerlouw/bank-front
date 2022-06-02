<template>
  <b-form @submit="onSubmit" @reset="onReset" v-if="show">
    <b-form-group
        id="input-group-3"
        label="activated"
        label-for="input-amount"
        description="The Amount to Deposit."
    >
      <b-form-input
          id="input-amount"
          v-model="form.amount"
          type="text"
          required
      ></b-form-input>
    </b-form-group>

    <b-button type="submit" variant="primary">Submit</b-button>
    <b-button type="reset" variant="danger">Reset</b-button>
  </b-form>
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
</template>

<script>
import {BFormInput} from "bootstrap-vue-3";
import axios from "@/services/TransactionService";

export default {
  name: "Deposit",
  components: {BFormInput},
  data() {
    return {
      form: {
        amount: "",
      },
      error: '',
      succes: '',
      show: true,
    }
  },
  methods: {
    async onSubmit() {
      try {
        this.error = '';
        this.succes = '';

        await axios
            .deposit( this.$route.query.iban , { amount: this.form.amount } );
        this.succes = ("Successfully deposit €" + this.form.amount + " to your account");
      } catch (error) {
        this.error = error.response.data;
        console.log(this.error);
      }
    },
    onReset() {
      // Reset our form values
      this.form.amount = '';
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

</style>