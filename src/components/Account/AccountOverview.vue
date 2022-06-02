<template>
    <div class="Account-overview-header">
        <h2>Checking accounts:</h2>
        <span class="Currency-identifier">EUR</span>
    </div>
    <div class="accounts-container bg-dark">
        <template v-for="account in this.accounts" :key="account">
            <Account v-if="account['type'] == 'Current'" :user="user" :account="account"></Account>
        </template>
    </div>
    <div class="Account-overview-header">
        <h2>Savings accounts:</h2>
        <span class="Currency-identifier">EUR</span>
    </div>
    <div class="accounts-container bg-dark">
        <template v-for="account in this.accounts" :key="account">
            <Account v-if="account['type'] == 'Savings'" :user="user" :account="account"></Account>
        </template>
    </div>
</template>

<script>
import Account from './Account.vue';
export default {
    name: "AccountOverview",
    components: { Account },
    props: {
    user: Object,
    accounts: Object,
    },
}
</script>

<style>
    .accounts-container {
        width: 70vw;
        margin: 0 auto;
        min-height: 100px;
        border-radius: 10px;
    }

    .Account-overview-header {
        width: 70vw;
        margin: 20px auto 0 auto;
        padding: 0 10px 0 10px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .Currency-identifier {
        color: gray;
        font-size: 1.5rem;
    }
</style>