<template>
    <div id="title">
        <h1 class="text-6xl font-bold mt-0 mb-2">
            VendoVote<br />
            <span class="text-primary font-bold">{{ $route.meta.pageName }}</span>
        </h1>
        <p class="text-700 my-0">
            Participate in vendor selection with confidence using our secure platform.
        </p>
        <p class="text-500 text-sm">{{ walletAddr }} | Connected With Metamask</p>
    </div>
</template>

<script setup>
import { getAccounts } from '@/utils'
import { onMounted, ref } from 'vue'

const walletAddr = ref('')

onMounted(async () => {
    const accounts = await getAccounts()
    walletAddr.value = `${accounts[0].slice(0, 10)}...${accounts[0].slice(-10)}`
})
</script>

<style scoped>
#title {
    display: block;
    margin: 0 auto;
    width: 600px;
    max-width: 100%;
    text-align: center;
}
</style>
