<template>
  <body class="body-login">
  <main class="form-login">
    <form @submit.prevent="resetPassword">
      <input type="hidden" name="type" value="user/changepassword">
      <img id="login-logo" class="mb-4" src="/img/cryptoplussers-logo.svg"
           alt="Cryptoplussers">
      <h1 class="h3 mb-3 fw-normal">Change password</h1>

      <div class="form-floating">
        <input type="password" class="form-control" id="floatingPassword" placeholder="Old Password"
               v-model="password">
        <label for="floatingPassword">Old Password</label>
      </div>
      <div class="form-floating">
        <input type="password" class="form-control" id="floatingPassword" placeholder="New Password"
               v-model="newPassword">
        <label for="floatingPassword">New Password</label>
      </div>

      <button class="w-100 btn btn-lg btn-primary" type="submit" id="submit" name="submit">Change password</button>
      <div class="card-footer py-3 border-0">
        <div class="text-center text-light">
          Don't want to change your password? <a href="/portfolio/index"
                                                 class="text-light">Go Back</a>
        </div>
      </div>
      <div v-if="error" id="alert-box">
        <div class="alert alert-danger" role="alert">
          {{ error }}
        </div>
      </div>
      <p id="copyright-login" class="mt-5 mb-3 text-muted">Copyright &copy; 2022 | Made by
        Bastiaan van der Bijl</p>
    </form>

  </main>
  </body>
</template>

<script>
import axios from "axios";

export default {
  name: "ResetPasswordScreen",
  data() {
    return {
      error: "",
      password: "",
      newPassword: "",
    }
  }, computed: {
    user() {
      return this.$store.getters.getUser
    }
  },
  methods: {
    async resetPassword() {
      await axios.post('users/resetpassword', {
        email: this.user["email"],
        newPassword: this.newPassword,
        password: this.password
      })
          .then(response => {
            this.portfolio = response.data
            this.logout()
          })
          .catch(error => {
            console.log(error.response.data.errorMessage)
            this.error = error.response.data.errorMessage
          })

    },
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/users/login');
    }
  }
}
</script>

<style scoped>
.body-login {
  display: flex;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
}

.form-login {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}

#login-logo {
  width: 60%;
  height: 60%;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.form-login .checkbox {
  font-weight: 400;
}

.form-login .form-floating:focus-within {
  z-index: 2;
}

.form-login input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-login input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

#copyright-login {
  font-size: 0.8rem;
}
</style>