<template>
  <div class="account-item" @click="openAccountDetails(this.account['iban'])">
      <div class="account-section section-iban">
          {{this.user['firstname']}} {{this.user['lastname']}}
          <i class="iban-identifier">{{this.account['iban']}}</i>
      </div>
    <div class="account-section section-balance" :class="{neg: this.account['balance'] < 0 }">
          € {{this.account['balance']}}
          <caption>Absolute limit: €{{this.account['absolute_Limit']}}</caption>
      </div>
  </div>
</template>

<script>
export default {
    name: "Account",
    props: {
        user: Object,
        account: Object,
    },
    methods: {
        openAccountDetails(iban) {
            this.$router.push('/accounts/detail?iban=' + iban);
        }
    }
}
</script>

<style>
    .account-item {
        width: 97%;
        height: 80px;
        margin: 10px auto;

        border: 5px solid #262739;

        display: flex;
        flex-direction: row;
    }

    .account-item:hover {
        border: 2px solid white;
        border-radius: 10px;
        cursor: pointer;
    }

    .account-section {
        display: flex;
        flex-direction: column;

        margin: 0 10px 0 10px;
        justify-content: space-around;

        color: white;
    }

    .section-iban {
        width: 80%;
        text-align: left;
    }

    .section-balance {
        width: 20%;
    }

    .section-balance, .section-balance caption {
        text-align: right;
    }

    .iban-identifier {
        color: grey;
    }
    .neg{
      color: red;
    }
</style>