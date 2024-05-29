<template>
    <div class="container grid grid-nogutter surface-section text-800">
        <div class="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center">
            <section>
                <span class="block text-6xl font-bold mb-1">VendoVote</span>
                <div class="text-6xl text-primary font-bold mb-3">
                    Secure and transparent vendor selections with ease
                </div>
                <p class="mt-0 mb-4 text-700 line-height-3">
                    VendoVote leverages advanced blockchain technology to ensure that our vendor
                    selection process is not only efficient but also highly secure and transparent.
                </p>
                <Button
                    v-if="account && account.length > 0"
                    label="Go To Dashboard"
                    type="button"
                    @click="$router.push({ name: 'dashboard' })"
                />
                <Button v-else label="Connect Metamask" type="button" @click="connectWallet" />
            </section>
        </div>
        <div class="col-12 md:col-6 overflow-hidden">
            <img
                id="illustration"
                src="@/assets/voting-illustration.svg"
                alt="E-voting illustration"
                class="md:ml-auto block md:h-full"
            />
        </div>
    </div>
</template>

<script setup>
import { getAccounts, requestAccounts } from '@/utils'
import { onMounted, ref } from 'vue'
import { useToast } from 'primevue/usetoast'

const toast = useToast()

const account = ref([])

onMounted(async () => {
    const accounts = await getAccounts()
    if (accounts.length > 0) account.value = accounts[0]
})

async function connectWallet() {
    const accounts = await requestAccounts()
    account.value = accounts[0]

    toast.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Wallet connected successfully!',
        life: 3000
    })
}
</script>

<style scoped>
#illustration {
    width: 100%;
}
</style>
