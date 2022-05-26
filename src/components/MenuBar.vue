<template>
  <header class="MainMenu">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <a href="#" class="navbar-brand">BBCBank</a>
        <button type="button" class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse1">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse1">
          <div class="navbar-nav">
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle active" data-bs-toggle="dropdown" href="#" role="button"
                 aria-expanded="false">Portfolio</a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" data-bs-toggle="modal" 
                       data-bs-target="#wallet-edit-modal">Edit wallet</a></li>
              </ul>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button"
                 aria-expanded="false">Profile</a>
              <ul class="dropdown-menu">
<!--                <li><a class="dropdown-item disabled">Current user: {{this.user["firstname"]}} {{this.user["lastname"]}}</a>-->
<!--                </li>-->
                <li>
                  <hr class="dropdown-divider">
                </li>
                <li><a class="dropdown-item" href="/users/changepassword">Change
                  password</a></li>
                <li><a class="dropdown-item" @click="logout">Logout</a>
                </li>
              </ul>
            </li>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>

export default {
  name: "MenuBar",
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/users/login');
    }
  },computed: {
    user () {
      return this.$store.getters.getUser
    }
  }
}
</script>

<style scoped>

</style>