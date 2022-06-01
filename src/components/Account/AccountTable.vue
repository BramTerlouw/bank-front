<template>
  <div id="userTable">
    <div class="table-responsive">
      <table class="table table-hover">
        <thead class="thead-dark bg-dark">
        <tr id="row">
          <th scope="col">Iban</th>
          <th scope="col">Type</th>
          <th scope="col">Active</th>
          <th scope="col">User</th>
        </tr>
        </thead>
        <tbody class="bg-dark" v-for="account in accounts" :key="account"  id="portfolio-table">
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
}
</script>

<style scoped>
#title{
 margin-left: auto;
  margin-right: auto;
}

#userTable{
  width: 80vw;
  margin-top: 40px;
  margin-left: auto;
  margin-right: auto;
}

table {
  text-align: left;
}

#row{
  border: 1px solid white;
}

#row th {
  padding: 15px;
  font-size: 1.2rem;
}

tbody {
  border: 1px solid white;
  font-style: italic;
}
</style>