
<template>
  <div class="transaction-item">
    <div class="transaction-section section-iban">
      <p>From:</p>
      <i class="iban-identifier">{{ transaction['ibanFrom'] }}</i>
    </div>
    <div class="transaction-section section-iban">
      <p>To:</p>
      <i class="iban-identifier">{{ transaction['ibanTo'] }}</i>
    </div>
    <!--    todo: nice time-->
    <div class="transaction-section section-time iban-identifier">
      {{ moment(this.transaction['iat']).format("YYYY-MM-DD HH:mm") }}
    </div>
    <div class="transaction-section section-balance iban-identifier" :class="{min: transaction['ibanFrom'] === this.$route.query.iban, plus: transaction['ibanTo'] === this.$route.query.iban}">
      € {{ this.transaction['amount'] }}
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "Transaction",
  props: {
    transaction: Object,
  },
  methods: {
    moment: function () {
      return moment();
    }
  },
  show: true,
}
</script>

<style scoped>
.transaction-item {
  width: 97%;
  height: 80px;
  margin: 10px auto;

  border: 5px solid #262739;

  display: flex;
  flex-direction: row;
}

.transaction-item:hover {
  border: 2px solid white;
  border-radius: 10px;
}

.transaction-section {
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

.section-time{
  width: 200px;
}

.section-balance {
  width: 20%;
  text-align: right;
}

.iban-identifier {
  color: grey;
}

.min {
  color: red;
}

.plus {
  color: green;
}
</style>