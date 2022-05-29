<template>
  <MenuBar />
  <div id="content">
    <div id="test">
      <h1>User: {{this.user["firstname"]}} {{this.user["lastname"]}} </h1>
      <h1>Rolles: {{this.user["role"]}} </h1>

    </div>
  </div>
  <FooterBar />
</template>

<script>
import MenuBar from "@/components/MenuBar";
import FooterBar from "@/components/FooterBar";
export default {
  name: "UserProfile",
  components: { MenuBar, FooterBar },
  computed: {
    user () {
      return this.$store.getters.getUser
    }
  }
}
</script>

<style scoped>
#content {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  background-color: #262739;
}

#test{
  margin-top: 50px;
}
</style>