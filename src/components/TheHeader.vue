<template>
    <div class="card">
        <Menubar class="px-4 py-3" :model="items">
            <template #start>
                <h1 class="logo font-bold m-0 mr-4">VendoVote</h1>
            </template>
            <template #item="{ item, props, hasSubmenu, root }">
                <a class="flex align-items-center" v-bind="props.action">
                    <span :class="item.icon" />
                    <span class="ml-2">{{ item.label }}</span>
                    <Badge
                        v-if="item.badge"
                        :class="{ 'ml-auto': !root, 'ml-2': root }"
                        :value="item.badge"
                    />
                    <span
                        v-if="item.shortcut"
                        class="ml-auto border-1 surface-border border-round surface-100 text-xs p-1"
                        >{{ item.shortcut }}</span
                    >
                    <i
                        v-if="hasSubmenu"
                        :class="[
                            'pi pi-angle-down',
                            { 'pi-angle-down ml-2': root, 'pi-angle-right ml-auto': !root }
                        ]"
                    ></i>
                </a>
            </template>
            <template #end>
                <div class="text-500 ml-4">{{ compressedWalletAddr }}</div>
            </template>
        </Menubar>
    </div>
</template>

<script setup>
import { ownerAddress } from '@/env'
import router from '@/router'
import { getAccounts } from '@/services/account'
import { computed, onMounted, ref } from 'vue'

const walletAddr = ref('')
const items = ref([
    {
        label: 'Home',
        icon: 'pi pi-home',
        command: () => {
            router.push({ name: 'home' })
        }
    },
    {
        label: 'Dashboard',
        icon: 'pi pi-align-justify',
        command: () => {
            router.push({ name: 'dashboard' })
        }
    },
    {
        label: 'Create Election',
        icon: 'pi pi-file-plus',
        command: () => {
            router.push({ name: 'create-election' })
        },
        visible: () => {
            return isAdmin.value
        }
    }
])

onMounted(async () => {
    const accounts = await getAccounts()
    walletAddr.value = accounts[0]
})

const compressedWalletAddr = computed(() => {
    return `${walletAddr.value.slice(0, 5)}...${walletAddr.value.slice(-5)}`
})

const isAdmin = computed(() => {
    if (walletAddr.value) return walletAddr.value === ownerAddress
    return false
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
.logo {
    font-size: 24px !important;
}
</style>
