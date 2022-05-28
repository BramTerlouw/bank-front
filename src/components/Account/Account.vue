<template>
  <div class="account-item">
      <div class="account-section section-iban">
          B Terlouw
          <i class="iban-identifier">NLxxINHO0xxxxxxxxx</i>
      </div>
      <div class="account-section section-balance">
          € 7,33
      </div>
  </div>
</template>

<script>
export default {

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