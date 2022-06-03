<template>
  <MenuBar />
  <div id="content">
    <div class="account-filter-wrapper">
      <b-form @submit="onSubmit" @reset="onReset" class="form" v-if="show">
        <b-form-group id="input-group-1">
          <b-form-input
            id="input-firstname"
            v-model="firstname"
            type="text"
            placeholder="Enter firstname..."
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2">
          <b-form-input
            id="input-lastname"
            v-model="lastname"
            type="text"
            placeholder="Enter lastname..."
          ></b-form-input>
        </b-form-group>

        <div class="filter-buttons">
          <b-button type="submit" variant="primary">Submit</b-button>
          <b-button type="reset" variant="danger">Reset</b-button>
        </div>
      </b-form>
    </div>
    <div class="pagination">
      <button @click="this.back()">Back</button>
      <button @click="this.next()">Next</button>
    </div>
    <div class="table-accounts">
      <AccountTable :accounts="this.items"></AccountTable>
    </div>
  </div>
  <FooterBar />
</template>

<script>
import MenuBar from "@/components/MenuBar";
import FooterBar from "@/components/FooterBar";
import AccountTable from "@/components/Account/AccountTable";
import axios from "../../services/AccountService";
export default {
  name: "AccountManagement",
  components: { MenuBar, FooterBar, AccountTable },
  data() {
    return {
      items: [],
      show: true,
      offset: 0,
      limit: 5,
      firstname: "",
      lastname: "",
    };
  },
  async created() {
    this.fetch();
  },
  methods: {
    async fetch() {
      this.items = [];
      await axios
        .getAllAccounts(this.offset, this.limit, this.firstname, this.lastname)
        .then((res) => {
          this.items = res;
        });
    },


    onSubmit() {
      this.fetch();
    },


    onReset() {
      // Reset our form values
      this.firstname = "";
      this.lastname = "";
      this.fetch();
      
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },


    next() {
      this.offset += 1;
      this.fetch();
    },


    back() {
      if (this.offset - 1 >= 0) {
        this.offset -= 1;
        this.fetch();
      }
    },
  },
};
</script>

<style>
.account-filter-wrapper {
  width: 20vw;
  margin: 0 0 0 10vw;
}

.form {
  margin: 20px 0 0 0;

  display: flex;
  flex-direction: column;
}

.table-accounts {
  width: 80vw;
  margin: 0 auto;
  border-radius: 10px;
}

.filter-buttons {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin: 0 0 10px 0;
}

.pagination {
  width: 150px;
  margin: 0 auto;

  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
</style>