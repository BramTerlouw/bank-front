<template>
  <MenuBar />
<div id="content">
<user-table></user-table>
</div>
  <FooterBar />
</template>

<script>
import MenuBar from "@/components/MenuBar";
import FooterBar from "@/components/FooterBar";
import UserTable from "@/components/UserManagement/UserTable";

export default {
  name: "UserManagement",
  components: {UserTable, MenuBar, FooterBar },
}
</script>

<style scoped>
#content {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  background-color: #262739;
}
</style>