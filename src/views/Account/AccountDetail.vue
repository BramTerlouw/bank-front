<template>
  <MenuBar/>
  <div id="content">
    <div v-if="this.error == ''" class="content-wrapper">
      <div class="toolbar-wrapper">
        <b-button-toolbar justify>
          <b-button-group class="mx-1">
            <b-button
                @click="
                this.$router.push(
                  '/accounts/setLimit?iban=' + this.account['iban']
                )
              "
                v-if="!disableEmployeeButtons()"
                class="employee mx-1"
                variant="outline-light"
            >Set account limit
            </b-button
            >

            <b-button
                @click="
                this.$router.push(
                  '/accounts/setPincode?iban=' + this.account['iban']
                )
              "
                class="mx-1"
                variant="outline-light"
            >Set pincode
            </b-button
            >

            <b-button
                @click="
                this.$router.push(
                  '/accounts/setStatus?iban=' + this.account['iban']
                )
              "
                v-if="!disableEmployeeButtons()"
                class="employee mx-1"
                variant="outline-light"
            >Account status
            </b-button
            >
            <b-button
                @click="
                this.$router.push(
                  '/accounts/atm?iban='+ this.account['iban']
                )
              "
                class=" mx-1"
                variant="outline-light"
            >ATM
            </b-button>
          </b-button-group>
          <b-button-group class="mx-1">
            <b-button
                class="mx-1"
                variant="outline-light"
                @click="
                this.$router.push(
                  '/transactions/newTransaction?iban=' + this.account['iban']
                )
              "
            >Transfer
            </b-button>
          </b-button-group>
        </b-button-toolbar>
      </div>
      <div class="account-wrapper bg-dark">
        <Account :user="this.user" :account="this.account"></Account>
      </div>

      <div class="Account-overview-header">
        <h2>Transactions:</h2>

        <div id="topbox">
          <b-button v-b-modal.modal-1 variant="primary">Filter options</b-button>
          <b-modal id="modal-1" title="Transaction filter options" ok-disabled cancel-disabled
                   hide-footer>
            <b-form @submit="onSubmitModal" @reset="onResetModal" v-if="showModal">
              <b-form-group
                  v-if="!disableEmployeeButtons()"
                  id="input-group-1"
                  label="IBAN from:"
                  label-for="input-from"
              >
                <b-form-input
                    id="input-from"
                    v-model="form.iban_from"
                    placeholder="Enter IBAN from"
                ></b-form-input>
              </b-form-group>

              <b-form-group
                  id="input-group-1"
                  label="IBAN to:"
                  label-for="input-to"
              >
                <b-form-input
                    id="input-to"
                    v-model="form.iban_to"
                    placeholder="Enter IBAN to"
                ></b-form-input>
              </b-form-group>

              <b-form-group
                  id="input-group-1"
                  label="Balance operator:"
                  label-for="input-op"
              >
                <b-form-input
                    id="input-op"
                    v-model="form.balance_operator"
                    placeholder=" <, ==, >, <=, >="
                ></b-form-input>
              </b-form-group>

              <b-form-group
                  id="input-group-1"
                  label="Balance:"
                  label-for="input-bal"
              >
                <b-form-input
                    id="input-bal"
                    v-model="form.balance"
                    placeholder="100,00"
                ></b-form-input>
              </b-form-group>

              <b-form-group
                  id="input-group-1"
                  label="Start date:"
                  label-for="input-start"
              >
                <b-form-input
                    id="input-start"
                    v-model="form.start_date"
                    placeholder="Enter start date"
                    type="date"
                ></b-form-input>
              </b-form-group>

              <b-form-group
                  id="input-group-1"
                  label="End date:"
                  label-for="input-end"
              >
                <b-form-input
                    id="input-end"
                    v-model="form.end_date"
                    placeholder="Enter end date"
                    type="date"
                ></b-form-input>
              </b-form-group>

              <b-form-group
                  id="input-group-1"
                  label="Offset:"
                  label-for="input-off"
              >
                <b-form-input
                    id="input-off"
                    v-model="form.offset"
                    placeholder="Enter offset"
                    type="number"
                    min="0"
                ></b-form-input>
              </b-form-group>

              <b-form-group
                  id="input-group-1"
                  label="Limit:"
                  label-for="input-lim"
              >
                <b-form-input
                    id="input-lim"
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
        <div class="account-section section-balance" :class="{neg: this.account['balance'] < 0 }">
          <caption>User Day limit: € {{ this.user['day_limit'] }}</caption>
        </div>
      </div>

      <div class="transaction-wrapper bg-dark">
        <template v-for="transaction in this.transactions" :key="transaction">
          <Transaction :transaction="transaction"></Transaction>
        </template>
      </div>
    </div>
    <div v-if="error" id="alert-box">
      <div class="alert alert-danger" role="alert">
        {{ error.status }}, {{ error.message }}
      </div>
    </div>
  </div>
  <FooterBar/>
</template>

<script>
import MenuBar from "@/components/MenuBar";
import FooterBar from "@/components/FooterBar";
import Account from "@/components/Account/Account";
import axios from "../../services/AccountService";
import axios2 from "../../services/TransactionService";
import Transaction from "@/components/Transactions/Transaction";
import {BModal} from "bootstrap-vue-3";
import moment from 'moment';

export default {
  name: "AccountDetail",
  components: {MenuBar, FooterBar, Account, Transaction, BModal},
  data() {
    return {
      account: {},
      user: {},
      transactions: {},
      error: "",
      form: {
        offset: 0,
        limit: 50,
        end_date: null,
        start_date: null,
        iban_from: this.$route.query.iban,
        iban_to: null,
        balance_operator: null,
        balance: null
      },
      showModal: true
    };

  },
  async created() {
    try {
      this.account = await axios.getAccountByIban(this.$route.query.iban);
      this.user = await axios.getAccountUser(this.account["user_Id"]);
      await axios2.getAllTransactionsFromAccount(this.account["iban"])
          .then((res) => {
            this.transactions = res;
          });
    } catch (error) {
      this.error = error.response.data;
    }
  },
  computed: {
    loggedUser() {
      return this.$store.getters.getUser;
    },
  },
  methods: {
    disableEmployeeButtons() {
      if (!this.loggedUser["role"].includes(1)) {
        return true;
      } else {
        return false;
      }
    },
    onSubmitModal(event) {
      event.preventDefault()
      try {
        let start = moment(String(this.form.start_date)).format("YYYY-MM-DD")
        let end = moment(String(this.form.end_date)).format("YYYY-MM-DD")
        axios2.getAllTransactions(this.form.offset, this.form.limit, start, end, this.form.iban_from, this.form.iban_to, this.form.balance_operator, this.form.balance)
            .then((res) => this.transactions = res)
      } catch (error) {
        this.error = error;
      }
    },
    onResetModal(event) {
      event.preventDefault()
      // Reset our form values
      this.form.iban_from = this.account["iban"]
      this.form.iban_to = ''
      this.form.balance_operator = ""
      this.form.balance = ""
      this.form.start_date = ""
      this.form.end_date = ""
      this.form.limit = 50
      this.form.offset = 0
      axios2.getAllTransactionsFromAccount(this.account["iban"])
          .then((res) => {
            this.transactions = res;
          });
      // Trick to reset/clear native browser form validation state
      this.showModal = false
      this.$nextTick(() => {
        this.showModal = true
      })
    },
  },
};
</script>

<style>
template {
  display: flex;
  flex-direction: column;
  background-color: #262739;
}

#content {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  background-color: #262739;
}

.account-wrapper {
  width: 70vw;
  margin: 20px auto;
  padding: 1px;

  border-radius: 10px;
}

.transaction-wrapper {
  width: 70vw;
  min-height: 500px;
  margin: 10px auto;
  padding: 1px;
  border-radius: 10px;
}

.toolbar-wrapper {
  width: 70vw;
  margin: 20px auto;
}
</style>