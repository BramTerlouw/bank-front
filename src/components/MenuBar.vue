<template>
  <header class="MainMenu">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="#">BBCBank</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
              aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/home" class="nav-link" active-class="active"
            >Home
            </router-link>
          </li>

          <li class="employee nav-item" >
            <router-link to="/usermanagement" class="nav-link" active-class="active"
            >User Management
            </router-link>
          </li>
          
          <li class="employee nav-item" >
            <router-link to="/accountmanagement" class="nav-link" active-class="active"
            >Account Management
            </router-link>
          </li>
          
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button"
               aria-expanded="false">Profile</a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item disabled">Current user: {{ this.user["firstname"] }}
                {{ this.user["lastname"] }}</a>
              </li>
              <li>
                <hr class="dropdown-divider">
              </li>
              <li>
                <router-link to="/users/profile" class="dropdown-item" active-class="active"
                >Edit Profile
                </router-link>
              </li>


              <li><a class="dropdown-item" @click="logout">Logout</a>
              </li>
            </ul>
          </li>


        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "MenuBar",

   mounted() {
    if(!this.user["role"].includes(1)){
      this.hideEmployeeItems();
    }
  }, computed: {
    user() {
      return this.$store.getters.getUser
    }
  },
  methods: {

    hideEmployeeItems(){
      document.getElementsByClassName('employee')[0].remove();
    },

    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/users/login');
    }
  }
}
</script>

<style scoped>
</style>