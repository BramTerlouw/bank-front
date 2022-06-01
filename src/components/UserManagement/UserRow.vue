<template>
  <tr>
    <td>
      <p>{{user.id}}</p>
    </td>
    <td>
      <p>{{user.firstname}}</p>
    </td>
    <td>
      <p>{{ user.lastname }}</p>
    </td>
    <td>
      <p>{{ user.email }}</p>
    </td>
    <td>
      <p>{{ user.phone }}</p>
    </td>
    <td>
      <p>2</p>
    </td>
    <td>
      <p>{{user.activated}}</p>
    </td>
  </tr>
</template>

<script>
export default {
  name: "UserRow",
  props: {
    user: Object
  },
}
</script>

<style scoped>

</style>