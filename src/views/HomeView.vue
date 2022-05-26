<template>
  <MenuBar />
  <div id="content">
    <div id="test">
    <h1>Naam: </h1>
    <h1>Rollen: </h1>
    </div>
  </div>
  <FooterBar />
</template>

<script>
import MenuBar from "@/components/MenuBar";

import FooterBar from "@/components/FooterBar";
export default {
  name: "HomeView",
  components: {MenuBar,  FooterBar},
}
</script>

<style scoped>

template{
  display: flex;
  flex-direction: column;
}

#test{
  margin-top: 50px;
}

#content {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

td h3 {
  font-size: 20px;
  padding: 10px;
}



.portfolio-head h1 {
  text-align: center;
  padding: 10px;
}

.portfolio-head h3 {
  text-align: center;
  padding: 15px;
}

.footer-container {
  margin-top: 30px;
}

.coin-edit-container {
  padding-top: 15px;
}
</style>