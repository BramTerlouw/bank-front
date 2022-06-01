<template>
  <router-view />
</template>

<script>



export default {
  name: 'App',
  components: {


  }
}
</script>

<style>
html{
  background-color: #262739;
}

body {
  background-color: #262739;
  margin: auto;
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

main {
  width: 100%;
  background-color: #262739;
}

h2 {
  color: white;
}

th {
  color: white;
}

h3 {
  color: white;
}

h1, p {
  color: white;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
