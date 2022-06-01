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
      <b-button @click="getUser(account['user'])" v-b-modal.test>Show details</b-button>
      <b-modal id="test" title="User details">
        <p class="my-4 test">Firstname: {{user['firstname']}}</p>
        <p class="my-4 test">Lastname: {{user['lastname']}}</p>
        <p class="my-4 test">Email: {{user['email']}}</p>
        <p class="my-4 test">Firstname: {{user['firstname']}}</p>
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
      });
    },
  },
};
</script>

<style scoped>
.test {
  color: black;
}
</style>