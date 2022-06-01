<template>
  <tr>
    <td>
      <p>- {{account['iban']}}</p>
    </td>
    <td>
      <p>{{account['type']}}</p>
    </td>
    <td>
      <p>{{account['active']}}</p>
    </td>
    <td>
      <p>{{account['user']}}</p>
    </td>
  </tr>
</template>

<script>
export default {
  name: "AccountRow",
  props: {
    account: Object,
  },
}
</script>

<style scoped>

</style>