<template>

  <body class="body-login">
  <main class="form-login">
    <b-form @submit="login">
      <input type="hidden" name="type" value="http://localhost/users/login">
      <img id="login-logo" class="mb-4" src="/img/BBCBank-logo.svg" alt="Cryptoplussers">
      <h1 class="h3 mb-3 fw-normal">Please Login</h1>

      <div class="form-floating">
        <input type="email" class="form-control" id="floatingInput" v-model="email" placeholder="name@example.com"/>
        <label for="floatingInput">Email address</label>
      </div>
      <div class="form-floating">
        <input type="password" class="form-control" id="floatingPassword" v-model="password"
               placeholder="Password"/>
        <label for="floatingPassword">Password</label>
      </div>

      <button class="w-100 btn btn-lg btn-primary" type="submit" id="submit" name="submit">Log in</button>
      <div class="card-footer py-3 border-0">
        <div class="text-center text-light">
          Don't have an account? <a href="/users/signup" class="text-light">Create
          One</a>
        </div>
      </div>
      <div  v-if="error" id="alert-box">
        <div class="alert alert-danger" role="alert">
        {{error}}
        </div>
      </div>


      <p id="copyright-login" class="mt-5 mb-3 text-muted">Copyright &copy; 2022 | BBCBank</p>
    </b-form>

  </main>
  </body>

</template>

<script>
import AuthService from '@/services/AuthService.js';
import {BForm} from "bootstrap-vue-3";
export default {
  name: "LoginView",
  components: {BForm},
  data(){
   return {
     email: '',
     password: '',
     error: ""
   }
  },
  methods: {
    async login() {
      try {
        const credentials = {
          email: this.email,
          password: this.password
        };
        const responseToken = await AuthService.login(credentials);
        const token = responseToken.data.token;
        this.$store.dispatch('setToken', { token});

        const response = await AuthService.getCurrentUser();
        const user = response.data;
        this.$store.dispatch('setUser', { user});

        this.$router.push('/home');
      } catch (error) {
        this.error = error.response.data.errorMessage
      }

    }
  }
}
</script>

<style scoped>

.body-login {
  background-color: #262739;
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

html{
  background-color: #262739;
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