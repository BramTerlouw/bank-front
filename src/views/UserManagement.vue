<template>
  <MenuBar />
<div id="content">
<h1>user management</h1>
</div>
  <FooterBar />
</template>

<script>
import MenuBar from "@/components/MenuBar";
import FooterBar from "@/components/FooterBar";

export default {
  name: "UserManagement",
  components: { MenuBar, FooterBar },
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