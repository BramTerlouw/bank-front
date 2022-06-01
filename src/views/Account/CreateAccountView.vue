<template>
  <MenuBar />
  <div id="content">
    <div class="form-wrapper bg-dark">
      <h2>Create new account:</h2>
      <div class="selected-user-section">
        <span>Selected user:</span>
        <span>{{ userId }}</span>
      </div>
      <b-form class="form" @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group id="input-group-3" label="Type:" label-for="input-type">
          <b-form-select
            id="input-type"
            v-model="type"
            :options="types"
            required
          ></b-form-select>
        </b-form-group>

        <div class="create-button">
          <b-button type="submit" variant="primary">Create</b-button>
        </div>
      </b-form>
      <div v-if="error" id="alert-box">
      <div class="alert alert-danger" role="alert">
        {{ error.status }}, {{error.message}}
      </div>
    </div>
    </div>
  </div>
  <FooterBar />
</template>

<script>
import MenuBar from "@/components/MenuBar";
import FooterBar from "@/components/FooterBar";
import axios from "../../services/AccountService";
export default {
  name: "CreateAccount",
  components: { MenuBar, FooterBar },
  data() {
    return {
      type: null,
      types: [
        { text: "Current", value: "Current" },
        { text: "Savings", value: "Savings" },
      ],
      show: true,
      userId: 2,
      error: "",
    };
  },
  methods: {
    async onSubmit() {
      try {
        await axios
          .createAccount({
            type: this.type,
            user_Id: this.userId,
          })
          .then((res) => {
            this.$router.push('/accounts/detail?iban=' + res['iban']);
          });
      } catch (error) {
        this.error = error.response.data
      }
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.type = null;
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>

<style scoped>
.form-wrapper {
  margin: 20px auto;
}

.form {
  width: 80%;
  margin: 0 auto;
}

.create-button {
  width: 100%;
  margin: 0 0 10px 0;
  display: flex;
  justify-content: flex-start;
}

.selected-user-section {
  width: 80%;
  margin: 10px auto 0 auto;

  display: flex;
  flex-direction: row;
  justify-content: space-between;

  color: white;
}
</style>