<template>
  <div class="account-item">
      <div class="account-section section-iban">
          {{this.user['firstname']}} {{this.user['lastname']}}
          <i class="iban-identifier">{{this.account['iban']}}</i>
      </div>
      <div class="account-section section-balance">
          € {{this.account['balance']}}
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
    mounted() {
        console.log(this.user);
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
        text-align: right;
    }

    .iban-identifier {
        color: grey;
    }
</style>