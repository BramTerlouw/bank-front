<template>
  <div id="userTable">
    <div id="topbox">
    <b-button v-b-modal.modal-1 variant="primary">Filter options</b-button>
      <h1 id="title">User Management</h1>
    <b-modal v-model="userFilterModal" id="modal-1" title="User filter options" ok-disabled cancel-disabled hide-footer>
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
          <b-form-checkbox-group
              id="checkbox-group-2"
              v-model="form.filterUserActive"
              :aria-describedby="ariaDescribedby"
              name="flavour-2"
          >
            <b-form-checkbox value="true">Users activated</b-form-checkbox>
            <b-form-checkbox value="false">Users deactivated</b-form-checkbox>

          </b-form-checkbox-group>
        </b-form-group>

        <b-form-group label="Filter users on account:" v-slot="{ ariaDescribedby }">
          <b-form-checkbox-group
              id="checkbox-group-2"
              v-model="form.filterUserAccount"
              :aria-describedby="ariaDescribedby"
              name="flavour-2"
          >
            <b-form-checkbox value="true">users with account</b-form-checkbox>
            <b-form-checkbox value="false">users with no account</b-form-checkbox>
          </b-form-checkbox-group>
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
      <table class="table table-hover">
        <thead class="thead-dark">
        <tr id="row">

          <th scope="col">UserId</th>
          <th scope="col">Firstname</th>
          <th scope="col">Lastname</th>
          <th scope="col">Email</th>
          <th scope="col">Phone</th>
          <th scope="col">Accounts</th>
          <th scope="col">Active</th>
        </tr>
        </thead>
        <tbody v-for="user in userList" :key="user"  id="portfolio-table">
        <user-row :user="user" />
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
      userList: [Object],
      form: {
        firstname: '',
        lastname: '',
        offset: 0,
        limit: 10,
        filterUserActive: [],
        filterUserAccount: [],
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

    loadUsers(){
      if(store.getters.isLoggedIn) {

        var api = 'users?offset='+this.form.offset.toString()+'&limit='+this.form.limit.toString()+'&firstname='+this.form.firstname.toString()+'&lastname='+this.form.lastname.toString() +'&activated='+this.form.active.toString()+'&hasaccount='+ this.form.account.toString()

        console.log(api)

        axios.get(api)
            .then(response => {
              this.userList = response.data
              console.log(response.data)
            })
            .catch(error => {
              console.log(error)
              this.errors = error
            })
      }
    },

    onSubmit(event) {
      event.preventDefault()
      alert(JSON.stringify(this.form))

      if(this.form.filterUserActive.includes("true") && this.form.filterUserActive.includes("false")){
        this.form.active = ""
      }
      else {
        if(this.form.filterUserActive.length == 0 ) {
          this.form.active = ""
        }
        else {
          this.form.active = this.form.filterUserActive[0];
        }
      }

      if(this.form.filterUserAccount.includes("true") && this.form.filterUserAccount.includes("false")){
        this.form.account = ""
      }
      else {
        if(this.form.filterUserAccount.length == 0 )
        {
          this.form.account = ""
        }else {
          this.form.account = this.form.filterUserAccount[0];
        }
      }

      this.loadUsers()
    },
    onReset(event) {
      event.preventDefault()
      // Reset our form values
      this.form.firstname = ''
      this.form.lastname = ''
      this.form.filterUserAccount = []
      this.form.filterUserActive = []
      this.form.limit = 10
      this.form.offset = 0
      this.form.account = ""
      this.form.active = ""
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
#title{
 margin-left: auto;
  margin-right: auto;
}
#topbox{
  border-bottom: white solid 1px;
  display: flex;
  flex-direction: row;
}

#userTable{
  width: 80%;
  margin-top: 40px;
  margin-left: auto;
  margin-right: auto;
}
</style>