<template>
  <tr>
    <td>
      <p>- {{ account["iban"] }}</p>
    </td>
    <td>
      <p>{{ account["type"] }}</p>
    </td>
    <td>
      <p>{{ account["active"] }}</p>
    </td>
    <td>
      <b-button @click="getUser(account['user'])" v-b-modal.test
        >Show details</b-button
      >
      <b-modal ok-only id="test" title="User details">
        <ul>
          <li>Firstname: {{ this.user["firstname"] }}</li>
          <li>Lastname: {{ user["lastname"] }}</li>
          <li>Email: {{ user["email"] }}</li>
          <li>Transaction limit: € {{ user["transaction_Limit"] }}</li>
          <li>Day limit: € {{ user["day_limit"] }}</li>
        </ul>
      </b-modal>
    </td>
  </tr>
</template>

<script>
import axios from "../../services/AccountService";
export default {
  name: "AccountRow",
  props: {
    account: Object,
  },
  data() {
    return {
      user: {},
    };
  },
  methods: {
    getUser(id) {
      axios.getAccountUser(id).then((res) => {
        this.user = res;
        console.log(this.user);
      });
    },
  },
};
</script>

<style scoped>
</style>