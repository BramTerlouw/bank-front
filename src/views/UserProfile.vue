<template>
  <MenuBar />
  <div id="content">

    <div id="profile-container">
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
    </div>
  </div>
  <FooterBar />
</template>

<script>
import MenuBar from "@/components/MenuBar";
import FooterBar from "@/components/FooterBar";
import UserService from "@/services/UserService";
export default {
  name: "UserProfile",
  components: { MenuBar, FooterBar },
  data(){
    return {
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
    }
  },
  computed: {
    user () {
      return this.$store.getters.getUser
    }
  },
  created() {
    this.loadUserDetails()
  },
  methods:{
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

    setUserDetails(){
      this.user.firstname = this.modalUserDetails.firstname
      this.user.lastname = this.modalUserDetails.lastname
      this.user.phone = this.modalUserDetails.phone
      this.user.email = this.modalUserDetails.email
      this.user.address = this.modalUserDetails.address
      this.user.city = this.modalUserDetails.city
      this.user.postalCode = this.modalUserDetails.postalcode
      this.user.transaction_Limit = this.modalUserDetails.transactionLimit
      this.user.day_limit = this.modalUserDetails.dayLimit
    },

    async changeUserDetails() {
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

        const token = response.token
        await this.$store.dispatch('setToken', { token});
        this.DetailsAlert.text = "User details successfully changed!"
        this.DetailsAlert.variant = "success"
        this.DetailsAlert.show = true

        this.setUserDetails()
      } catch (error) {
        this.DetailsAlert.text = error.response.data
        this.DetailsAlert.variant = "danger"
        this.DetailsAlert.show = true
      }
    }
  }
}
</script>

<style scoped>
#content {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  background-color: #262739;
}

#profile-container{
  background: white;
  width: 50%;
  margin: auto;
  border-radius: 10px;
}

</style>