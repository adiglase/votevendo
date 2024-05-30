<template>
    <Toast />
    <RouterView />
</template>

<script setup>
import { useToast } from 'primevue/usetoast'
import router from './router'

const toast = useToast()

window.ethereum.on('accountsChanged', function (accounts) {
    if (accounts.length === 0) {
        router.push({ name: 'home' })
        toast.add({
            severity: 'success',
            summary: 'Disconnected',
            detail: 'Metamask wallet disconnected',
            life: 3000
        })
    }
})
</script>

<style scoped></style>
