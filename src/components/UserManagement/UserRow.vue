<template>
  <tr @click="modalUserEditOption = !modalUserEditOption">
    <td>
      <p>{{ user.id }}</p>
    </td>
    <td>
      <p>{{ user.firstname }}</p>
    </td>
    <td>
      <p>{{ user.lastname }}</p>
    </td>
    <td>
      <p>{{ user.email }}</p>
    </td>
    <td>
      <p>{{ user.phone }}</p>
    </td>
    <td>
      <p>{{ user.address }}</p>
    </td>
    <td>
      <p>{{ user.postalCode }}</p>
    </td>
    <td>
      <p>{{ user.city }}</p>
    </td>
    <td>
      <p>{{ roles }}</p>
    </td>
    <td>
      <p>{{ amountAccounts }}</p>
    </td>
    <td>
      <p>{{ user.transaction_Limit }}</p>
    </td>
    <td>
      <p>{{ user.day_limit }}</p>
    </td>
    <td>
      <p>{{ user.activated }}</p>
    </td>
  </tr>

  <b-modal v-model="modalUserEditOption" title="Edit User" ok-disabled cancel-disabled hide-footer>
    <div>
      <b-button style="margin: 5px" @click="modalUserPassword.show = !modalUserPassword.show" variant="primary">Edit Password</b-button>
      <b-button style="margin: 5px" @click="modalUserRoles.show = !modalUserRoles.show" variant="primary">Edit Roles</b-button>
      <b-button style="margin: 5px" @click="addAccount" variant="primary">Add Accounts</b-button>
      <b-button style="margin: 5px" @click="loadUserDetails" variant="primary">Edit Details</b-button>
      <b-button style="margin: 5px" @click="loadUserActivation" variant="primary">Edit Activation</b-button>
    </div>
  </b-modal>

  <b-modal v-model="modalUserRoles.show" title="Edit Roles" ok-disabled cancel-disabled hide-footer>
    <b-form @submit="changeRoles"  >
      <b-form-group label="Set role" v-slot="{ ariaDescribedby }">
        <b-form-radio v-model="modalUserRoles.selected" :aria-describedby="ariaDescribedby" name="some-radios" value="A">User</b-form-radio>
        <b-form-radio v-model="modalUserRoles.selected" :aria-describedby="ariaDescribedby" name="some-radios" value="B">Employee</b-form-radio>
        <b-form-radio v-model="modalUserRoles.selected" :aria-describedby="ariaDescribedby" name="some-radios" value="C">User and employee</b-form-radio>
      </b-form-group>


      <b-button type="submit" variant="primary">Apply</b-button>
    </b-form>

    <b-alert dismissible :variant="passwordAlert.variant" v-model="passwordAlert.show">{{passwordAlert.text}}</b-alert>
  </b-modal>



  <b-modal v-model="modalUserPassword.show" title="Edit Password" ok-disabled cancel-disabled hide-footer>
    <b-form @submit="changePassword"  >
      <b-form-group
          id="input-group-1"
          label="New Password (Contains at least 2 uppercase letters):"
          label-for="input-1"
      >
        <b-form-input
            id="input-1"
            v-model="modalUserPassword.newPassword"
            placeholder="Enter new Password"
            type="password"
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Apply</b-button>
    </b-form>

    <b-alert dismissible :variant="passwordAlert.variant" v-model="passwordAlert.show">{{passwordAlert.text}}</b-alert>
  </b-modal>


  <b-modal v-model="modalUserDetails.show" title="Edit Details" ok-disabled cancel-disabled hide-footer>
    <b-form @submit="changeUserDetails">
      <b-form-group
          id="input-group-1"
          label="Firstname:"
          label-for="input-1"
      >
        <b-form-input
            id="input-1"
            v-model="modalUserDetails.firstname"
            placeholder="Enter a Firstname"
        ></b-form-input>

      </b-form-group>

      <b-form-group
          id="input-group-1"
          label="Lastname:"
          label-for="input-1"
      >
        <b-form-input
            id="input-1"
            v-model="modalUserDetails.lastname"
            placeholder="Enter a Lastname"
        ></b-form-input>

      </b-form-group>

      <b-form-group
          id="input-group-1"
          label="Address:"
          label-for="input-1"
      >
        <b-form-input
            id="input-1"
            v-model="modalUserDetails.address"
            placeholder="Enter a Address"
        ></b-form-input>

        <b-form-group
            id="input-group-1"
            label="City:"
            label-for="input-1"
        >
          <b-form-input
              id="input-1"
              v-model="modalUserDetails.city"
              placeholder="Enter a City"
          ></b-form-input>

          <b-form-group
              id="input-group-1"
              label="Postalcode:"
              label-for="input-1"
          >
            <b-form-input
                id="input-1"
                v-model="modalUserDetails.postalcode"
                placeholder="Enter a Postalcode"
            ></b-form-input>

          </b-form-group>

          <b-form-group
              id="input-group-1"
              label="Email:"
              label-for="input-1"
          >
            <b-form-input
                id="input-1"
                v-model="modalUserDetails.email"
                placeholder="Enter a Email"
            ></b-form-input>
          </b-form-group>

          <b-form-group
              id="input-group-1"
              label="Phone:"
              label-for="input-1"
          >
            <b-form-input
                id="input-1"
                v-model="modalUserDetails.phone"
                placeholder="Enter a Phone number"
            ></b-form-input>

          </b-form-group>

          <b-form-group
              id="input-group-1"
              label="Transaction Limit:"
              label-for="input-1"
          >
            <b-form-input
                id="input-1"
                v-model="modalUserDetails.transactionLimit"
                placeholder="Enter a Transaction Limit"
                type="number"
                min="1"
                step="1"
            ></b-form-input>

          </b-form-group>

          <b-form-group
              id="input-group-1"
              label="Day Limit:"
              label-for="input-1"
          >
            <b-form-input
                id="input-1"
                v-model="modalUserDetails.dayLimit"
                placeholder="Enter a Day Limit"
                type="number"
                min="1"
                step="1"
            ></b-form-input>

          </b-form-group>


        </b-form-group>

      </b-form-group>


      <b-button type="submit" variant="primary">Apply</b-button>
    </b-form>

    <b-alert dismissible :variant="DetailsAlert.variant" v-model="DetailsAlert.show">{{DetailsAlert.text}}</b-alert>
  </b-modal>

  <b-modal v-model="modalUserActivation.show" title="Edit Activation" ok-disabled cancel-disabled hide-footer>
    <b-form @submit="changeActivation"  >
      <b-form-group label="Set role" v-slot="{ ariaDescribedby }">
        <b-form-radio v-model="modalUserActivation.userActivated" :aria-describedby="ariaDescribedby" name="activationRadio" value="true">Activated</b-form-radio>
        <b-form-radio v-model="modalUserActivation.userActivated" :aria-describedby="ariaDescribedby" name="activationRadio" value="false">Deactivated</b-form-radio>
      </b-form-group>


      <b-button type="submit" variant="primary">Apply</b-button>
    </b-form>

    <b-alert dismissible :variant="ActivationAlert.variant" v-model="ActivationAlert.show">{{ActivationAlert.text}}</b-alert>
  </b-modal>



</template>
<script>
import store from "@/store";
import axios from "axios";
import AuthService from "@/services/AuthService";
import UserService from "@/services/UserService";

export default {
  name: "UserRow",
  props: {
    user: Object
  },
  data() {
    return {
      passwordAlert: {
        show: false,
        variant: "danger",
        text: "test"
      },

      modalUserPassword: {
        show: false,
        newPassword: ""
      },

      rolesAlert: {
        show: false,
        variant: "danger",
        text: "test"
      },

      modalUserRoles: {
        show: false,
        newRoles: [],
        selected: []
      },

      DetailsAlert: {
        show: false,
        variant: "danger",
        text: "test"
      },

      modalUserDetails: {
        show: false,
        newRoles: [],
        selected: [],
        firstname: "",
        lastname: "",
        phone: "",
        address: "",
        postalcode: "",
        city: "",
        email: "",
        transactionLimit: 0,
        dayLimit: 0
      },

      ActivationAlert: {
        show: false,
        variant: "danger",
        text: "test"
      },

      modalUserActivation: {
        show: false,
        userActivated: "true"
      },


      modalUserEditOption: false,
      roles: "",
      amountAccounts: 0,
      accounts: []
    }
  },
  mounted() {
    if (store.getters.isLoggedIn) {
      this.showRolesFormat()
      this.loadAccounts()
    }
  },
  methods: {
    loadAccounts() {
      if (store.getters.isLoggedIn) {
        axios.get("/users/" + this.user.id + "/accounts")
            .then(response => {
              this.accounts = response.data
              this.amountAccounts = response.data.length
            })
            .catch(error => {
              console.log(error)
              this.errors = error
            })
      }
    },

    async changeRoles(){
        if(this.modalUserRoles.selected.includes("C")){
          this.modalUserRoles.newRoles = [0, 1]
        }else if(this.modalUserRoles.selected.includes("B")){
          this.modalUserRoles.newRoles = [1]
        }else {
          this.modalUserRoles.newRoles = [0]
        }

      try {
        const credentials = {
          userid: this.user.id,
          roles: this.modalUserRoles.newRoles,
        };
        const response = await UserService.changeRole(credentials);

        this.passwordAlert.text = response
        this.passwordAlert.variant = "success"
        this.passwordAlert.show = true
        this.modalUserPassword.newPassword = "";
      } catch (error) {
        this.passwordAlert.text = error.response.data
        this.passwordAlert.variant = "danger"
        this.passwordAlert.show = true
      }
      this.modalUserDetails.show = false;
        this.modalUserRoles.show =false;
        this.modalUserPassword.show = false;
        this.modalUserEditOption = false;
      this.modalUserActivation.show = false;
      this.$emit('refresh')
    },

    async changeActivation(){
      try {
        const credentials = {
          userid: this.user.id,
          activated: this.modalUserActivation.userActivated,
        };
        const response = await UserService.changeUserActivation(credentials);

        this.ActivationAlert.text = response
        this.ActivationAlert.variant = "success"
        this.ActivationAlert.show = true
      } catch (error) {
        this.ActivationAlert.text = error.response.data
        this.ActivationAlert.variant = "danger"
        this.ActivationAlert.show = true
      }
      this.modalUserDetails.show = false;
      this.modalUserRoles.show =false;
      this.modalUserPassword.show = false;
      this.modalUserEditOption = false;
      this.modalUserActivation.show = false;
      this.$emit('refresh')
    },

    loadUserActivation(){
      this.modalUserActivation.userActivated = this.user.activated;
      this.modalUserActivation.show = !this.modalUserActivation.show;
    },

    loadUserDetails(){
      this.modalUserDetails.firstname = this.user.firstname
      this.modalUserDetails.lastname = this.user.lastname
      this.modalUserDetails.phone = this.user.phone
      this.modalUserDetails.email = this.user.email
      this.modalUserDetails.address = this.user.address
      this.modalUserDetails.city = this.user.city
      this.modalUserDetails.postalcode = this.user.postalCode
      this.modalUserDetails.transactionLimit = this.user.transaction_Limit
      this.modalUserDetails.dayLimit = this.user.day_limit
      this.modalUserDetails.show = !this.modalUserDetails.show;
    },

    async changeUserDetails(){
      try {
        const credentials = {
          userid: this.user.id,
          firstname: this.modalUserDetails.firstname,
          lastname: this.modalUserDetails.lastname,
          email: this.modalUserDetails.email,
          phone: this.modalUserDetails.phone,
          address: this.modalUserDetails.address,
          city: this.modalUserDetails.city,
          postalCode: this.modalUserDetails.postalcode,
          day_limit: this.modalUserDetails.dayLimit,
          transaction_Limit: this.modalUserDetails.transactionLimit
        };
        const response = await UserService.changeUserDetails(credentials);

        this.DetailsAlert.text = response
        this.DetailsAlert.variant = "success"
        this.DetailsAlert.show = true
      } catch (error) {
        this.DetailsAlert.text = error.response.data
        this.DetailsAlert.variant = "danger"
        this.DetailsAlert.show = true
      }

      this.modalUserDetails.show = false;
      this.modalUserRoles.show =false;
      this.modalUserPassword.show = false;
      this.modalUserEditOption = false;
      this.modalUserActivation.show = false;
      this.$emit('refresh')
    },

    async changePassword(){
      try {
        const credentials = {
          userid: this.user.id,
          oldPassword: this.modalUserPassword.newPassword,
          newPassword: this.modalUserPassword.newPassword
        };
        const response = await AuthService.resetPassword(credentials);

        this.passwordAlert.text = response
        this.passwordAlert.variant = "success"
        this.passwordAlert.show = true
        this.modalUserPassword.newPassword = "";
      } catch (error) {
        this.passwordAlert.text = error.response.data
        this.passwordAlert.variant = "danger"
        this.passwordAlert.show = true
      }
    },
    addAccount(){
      this.modalUserDetails.show = false;
      this.modalUserRoles.show =false;
      this.modalUserPassword.show = false;
      this.modalUserEditOption = false;
      this.$router.push('/accounts/create?userid='+ this.user.id);
    },
    showRolesFormat() {

      if (this.user.role.includes(1)&& this.user.role.includes(0)) {
        this.roles = "Employee, User"
        this.modalUserRoles.selected = "C";
      }else {

        if (this.user.role.includes(1)) {
          this.roles = "Employee"
          this.modalUserRoles.selected = "B";
        }

        if (this.user.role.includes(0)) {
          this.roles = "User"
          this.modalUserRoles.selected = "A";
        }
      }
    }
  }
}

</script>

<style scoped>

</style>