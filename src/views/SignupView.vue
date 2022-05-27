<template>

  <body class="body-login">
  <main class="form-login">d
    <form @submit.prevent="signup">
      <img id="login-logo" class="mb-4" src="/img/BBCBank-logo.svg"
           alt="Cryptoplussers">
      <h1 class="h3 mb-3 fw-normal">Please Signup</h1>

      <div class="form-floating">
        <input type="text" class="form-control" id="floatingInput" pattern="[a-zA-Z][a-zA-Z0-9\s]*"
               title="Fill in a correct firstname" v-model="firstname" placeholder="First name">
        <label for="floatingInput">First name</label>
      </div>

      <div class="form-floating">
        <input type="text" class="form-control" id="floatingInput" pattern="[a-zA-Z][a-zA-Z0-9\s]*"
               title="Fill in a correct lastname" v-model="lastname" placeholder="Last name">
        <label for="floatingInput">Last name</label>
      </div>

      <div class="form-floating">
        <input type="text" class="form-control" id="floatingInput"
               title="Fill in a correct lastname" v-model="address" placeholder="Address">
        <label for="floatingInput">Address</label>
      </div>

      <div class="form-floating">
        <input type="text" class="form-control" id="floatingInput" pattern="[a-zA-Z][a-zA-Z0-9\s]*"
               title="Fill in a correct lastname" v-model="city" placeholder="City">
        <label for="floatingInput">City</label>
      </div>

      <div class="form-floating">
        <input type="text" class="form-control" id="floatingInput"
               title="Fill in a correct lastname" v-model="postalCode" placeholder="PostalCode">
        <label for="floatingInput">PostalCode</label>
      </div>

      <div class="form-floating">
        <input type="tel" class="form-control" id="floatingInput"
               title="Fill in a correct lastname" v-model="phone" placeholder="Phone">
        <label for="floatingInput">Phone</label>
      </div>

      <div class="form-floating">
        <input type="email" class="form-control" id="floatingInput" v-model="email" placeholder="name@example.com">
        <label for="floatingInput">Email address</label>
      </div>
      <div class="form-floating">
        <input type="password" class="form-control" id="floatingPassword" v-model="password"
               placeholder="Password">
        <label for="floatingPassword">Password</label>
      </div>


      <button class="w-100 btn btn-lg btn-primary" type="submit">Sign Up</button>
      <div class="card-footer py-3 border-0">
        <div class="text-center text-light">
          Already have an account? <a href="/users/login" class="text-light">Login</a>
        </div>
      </div>
      <div v-if="error" id="alert-box">
        <div class="alert alert-danger" role="alert">
          {{ error }}
        </div>
      </div>
      <p id="copyright-login" class="mt-5 mb-3 text-muted">Copyright &copy; 2022 | BBCBank</p>
    </form>

  </main>
  </body>

</template>

<script>
import axios from "axios";

export default {
  name: "SignupScreen",
  data() {
    return {
      error: "",
      firstname: "",
      lastname: "",
      address: "",
      city: "",
      postalCode: "",
      password: "",
      email: "",
      phone: ""
    }
  },
  methods: {
    async signup() {
      await axios.post('users', {
        firstname: this.firstname,
        lastname: this.lastname,
        address: this.address,
        city: this.city,
        postalCode: this.postalCode,
        email: this.email,
        password: this.password,
        phone: this.phone
      })
          .then(response => {
            this.portfolio = response.data
            this.$router.push('/users/login');
          })
          .catch(error => {
            this.error = error.response.data.errorMessage
          })

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


.form-floating {
  padding-bottom: 5px
}
</style>