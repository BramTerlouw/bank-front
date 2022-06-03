<template>
  <div id="userTable">
    <div id="topbox">
      <b-button v-b-modal.modal-1 variant="primary">Filter options</b-button>
      <h1 id="title">User Management</h1>
      <b-modal id="modal-1" title="User filter options" ok-disabled cancel-disabled
               hide-footer>
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
          <b-form-group
              id="input-group-1"
              label="Firstname:"
              label-for="input-1"
          >
            <b-form-input
                id="input-1"
                v-model="form.firstname"
                placeholder="Enter firstname"
            ></b-form-input>
          </b-form-group>

          <b-form-group
              id="input-group-1"
              label="Lastname:"
              label-for="input-1"
          >
            <b-form-input
                id="input-1"
                v-model="form.lastname"
                placeholder="Enter lastname"
            ></b-form-input>
          </b-form-group>

          <b-form-group label="Filter users on activation:" v-slot="{ ariaDescribedby }">
            <b-form-radio v-model="form.filterUserActive" :aria-describedby="ariaDescribedby" name="activation-radio" value="A">Activated</b-form-radio>
            <b-form-radio v-model="form.filterUserActive" :aria-describedby="ariaDescribedby" name="activation-radio" value="B">Deactivated</b-form-radio>
            <b-form-radio v-model="form.filterUserActive" :aria-describedby="ariaDescribedby" name="activation-radio" value="C">Both</b-form-radio>
          </b-form-group>


          <b-form-group label="Filter users on account:" v-slot="{ ariaDescribedby }">
            <b-form-radio v-model="form.filterUserAccount" :aria-describedby="ariaDescribedby" name="account-radio" value="A">With Account</b-form-radio>
            <b-form-radio v-model="form.filterUserAccount" :aria-describedby="ariaDescribedby" name="account-radio" value="B">Without Account</b-form-radio>
            <b-form-radio v-model="form.filterUserAccount" :aria-describedby="ariaDescribedby" name="account-radio" value="C">Both</b-form-radio>
          </b-form-group>








          <b-form-group
              id="input-group-1"
              label="Offset:"
              label-for="input-1"
          >
            <b-form-input
                id="input-1"
                v-model="form.offset"
                placeholder="Enter offset"
                type="number"
                min="0"
            ></b-form-input>
          </b-form-group>

          <b-form-group
              id="input-group-1"
              label="Limit:"
              label-for="input-1"
          >
            <b-form-input
                id="input-1"
                v-model="form.limit"
                type="number"
                min="1"
                placeholder="Enter limit"
            ></b-form-input>
          </b-form-group>


          <b-button type="reset" variant="danger">Reset</b-button>
          <b-button type="submit" variant="primary">Apply</b-button>
        </b-form>
      </b-modal>
    </div>
    <div class="table-responsive">






      <table  class="table table-hover">
        <thead class="thead-dark">
        <tr id="row">

          <th scope="col">UserId</th>
          <th scope="col">Firstname</th>
          <th scope="col">Lastname</th>
          <th scope="col">Email</th>
          <th scope="col">Phone</th>
          <th scope="col">Address</th>
          <th scope="col">Postalcode</th>
          <th scope="col">City</th>
          <th scope="col">Role</th>
          <th scope="col">Accounts</th>
          <th scope="col">transaction Limit</th>
          <th scope="col">Day Limit</th>
          <th scope="col">Active</th>
        </tr>
        </thead>
        <tbody v-for="user in userList" :key="user" id="portfolio-table">
        <user-row :user="user" @refresh="loadUsers" />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import userRow from "@/components/UserManagement/UserRow";
import {BModal} from "bootstrap-vue-3";
import store from "@/store";
import axios from "axios";

export default {
  name: "UserTable",
  components: {BModal, userRow},
  data() {
    return {
      userList: [],
      form: {
        firstname: '',
        lastname: '',
        offset: 0,
        limit: 10,
        filterUserActive: 'C',
        filterUserAccount: 'C',
        active: "",
        account: ""
      },
      show: true
    }
  },
  async created() {
    if (store.getters.isLoggedIn) {
      await this.loadUsers()
    }
  },
  methods: {

    loadUsers() {
      if (store.getters.isLoggedIn) {

        var api = 'users?offset=' + this.form.offset.toString() + '&limit=' + this.form.limit.toString() + '&firstname=' + this.form.firstname.toString() + '&lastname=' + this.form.lastname.toString() + '&activated=' + this.form.active.toString() + '&hasaccount=' + this.form.account.toString()

        axios.get(api)
            .then(response => {
              this.userList = response.data
            })
            .catch(error => {
              this.errors = error
            })
      }
    },

    onSubmit(event) {
      event.preventDefault()

      if(this.form.filterUserActive === "C"){
        this.form.active = "";

      }else{

        if(this.form.filterUserActive === "A"){
          this.form.active = "true";

        }else{
          this.form.active = "false";
        }
      }

      if(this.form.filterUserAccount === "C"){
        this.form.account = "";

      }else{

        if(this.form.filterUserAccount === "A"){
          this.form.account = "true";

        }else{
          this.form.account = "false";
        }
      }

      this.loadUsers()
    },
    onReset(event) {
      event.preventDefault()
      // Reset our form values
      this.form.firstname = ''
      this.form.lastname = ''
      this.form.filterUserAccount = "C"
      this.form.filterUserActive = "C"
      this.form.limit = 10
      this.form.offset = 0
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>

<style scoped>
#title {
  margin-left: auto;
  margin-right: auto;
}

#topbox {
  border-bottom: white solid 1px;
  display: flex;
  flex-direction: row;
}

#userTable {
  width: 90%;
  margin-top: 40px;
  margin-left: auto;
  margin-right: auto;
}
</style>