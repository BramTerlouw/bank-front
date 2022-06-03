<template>
  <tr>
    <td>
      <p>- {{ account["iban"] }}</p>
    </td>
    <td>
      <p>{{ account["type"] }}</p>
    </td>
    <td>
      <p>{{ account["activated"] }}</p>
    </td>
    <td>
      <b-button @click="getUser(account['user_Id'])" v-b-modal.test
        >Show user</b-button
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
    <td>
      <b-button @click="routeToEdit(account['iban'])"
        >Edit</b-button
      >
    </td>
  </tr>
</template>

<script>
import axios from "../../services/AccountService";
export default {
  name: "AccountRow",
  props: {
    account: {},
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
      });
    },
    routeToEdit(iban) {
      this.$router.push('/accounts/detail?iban=' + iban);
    }
  },
};
</script>

<style scoped>
</style>