<template>
  <div id="userTable">
    <div class="table-responsive">
      <table class="table table-hover">
        <thead class="thead-dark">
        <tr id="row">

          <th scope="col">Iban</th>
          <th scope="col">Type</th>
          <th scope="col">Active</th>
          <th scope="col">User</th>
        </tr>
        </thead>
        <tbody v-for="account in accounts" :key="account"  id="portfolio-table">
        <account-row :account="account" />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import AccountRow from "@/components/Account/AccountRow";
export default {
  name: "AccountTable",
  components: {AccountRow},
  props: {
    accounts: [Object],
  },
  methods: {

  }
}
</script>

<style scoped>
#title{
 margin-left: auto;
  margin-right: auto;
}

#userTable{
  width: 80%;
  margin-top: 40px;
  margin-left: auto;
  margin-right: auto;
}
</style>