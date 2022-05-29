<template>
  <MenuBar />
  <div id="content">
    <div id="test">
    <h1>User: {{this.user["firstname"]}} {{this.user["lastname"]}} </h1>
    <h1>Rolles: {{this.user["role"]}} </h1>
    </div>
    <AccountOverview :user="this.user" />
  </div>
  <FooterBar />
</template>

<script>
import MenuBar from "@/components/MenuBar";
import FooterBar from "@/components/FooterBar";
import AccountOverview from "../components/Account/AccountOverview.vue";
export default {
  name: "HomeView",
  components: { MenuBar, FooterBar, AccountOverview },
  computed: {
    user () {
      return this.$store.getters.getUser
    }
  }
}
</script>

<style scoped>



template{
  display: flex;
  flex-direction: column;
  background-color: #262739;
}


#content {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  background-color: #262739;
}

td h3 {
  font-size: 20px;
  padding: 10px;
}




</style>