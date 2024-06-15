<template>
    <div class="w-full container">
        <TheHeader></TheHeader>

        <div id="elections" class="mx-auto mt-4 flex flex-wrap gap-4">
            <Card class="elections-list flex-1">
                <template #title>Incoming Vendor Elections</template>
                <template #content>
                    <ProgressSpinner v-if="isLoading" style="width: 50px; height: 50px" />
                    <DataView v-else :value="incomingElections">
                        <template #list="slotProps">
                            <div v-for="(election, index) in slotProps.items" :key="index">
                                <div class="flex flex-row align-items-center py-2">
                                    <div
                                        class="flex flex-row justify-content-between align-items-center flex-1"
                                    >
                                        <div
                                            class="flex flex-column justify-content-between align-items-start"
                                        >
                                            <div>
                                                <div class="font-medium text-900">
                                                    {{ election.name }}
                                                </div>
                                            </div>
                                            <div>
                                                <div class="text-xs font-light">
                                                    {{ election.endDate }}
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            v-if="!isAdmin"
                                            class="flex flex-column md:align-items-end gap-5"
                                        >
                                            <div class="flex flex-row-reverse md:flex-row gap-2">
                                                <RouterLink
                                                    :to="{
                                                        name: 'vote',
                                                        params: { id: election.id }
                                                    }"
                                                >
                                                    <Button
                                                        size="small"
                                                        :label="
                                                            getElectionActionLabel(
                                                                election.hasVoted
                                                            )
                                                        "
                                                        class="flex-auto md:flex-initial white-space-nowrap"
                                                    ></Button>
                                                </RouterLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </DataView>
                </template>
            </Card>
            <Card class="elections-list flex-1">
                <template #title>Past Vendor Elections</template>
                <template #content>
                    <ProgressSpinner v-if="isLoading" style="width: 50px; height: 50px" />
                    <DataView v-else :value="pastElections">
                        <template #list="slotProps">
                            <div v-for="(election, index) in slotProps.items" :key="index">
                                <div class="flex flex-row align-items-center py-2">
                                    <div
                                        class="flex flex-row justify-content-between align-items-center flex-1"
                                    >
                                        <div
                                            class="flex flex-column justify-content-between align-items-start"
                                        >
                                            <div>
                                                <div class="font-medium text-900">
                                                    {{ election.name }}
                                                </div>
                                            </div>
                                            <div>
                                                <div class="text-xs font-light">
                                                    {{ election.endDate }}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="flex flex-column md:align-items-end gap-5">
                                            <div class="flex flex-row-reverse md:flex-row gap-2">
                                                <RouterLink
                                                    :to="{
                                                        name: 'vote',
                                                        params: { id: election.id }
                                                    }"
                                                >
                                                    <Button
                                                        size="small"
                                                        label="View"
                                                        class="flex-auto md:flex-initial white-space-nowrap"
                                                        severity="info"
                                                    ></Button>
                                                </RouterLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </DataView>
                </template>
            </Card>
        </div>
    </div>
</template>

<script setup>
import { utils } from 'web3'
import TheHeader from '@/components/TheHeader.vue'
import { getElections } from '@/services/election'
import { computed, onMounted, ref } from 'vue'
import { getAccounts } from '@/services/account'
import { ownerAddress } from '@/env'

const incomingElections = ref([])
const pastElections = ref([])
const isLoading = ref(false)
const walletAddr = ref('')

onMounted(async () => {
    isLoading.value = true

    const electionList = await getElectionList()

    incomingElections.value = electionList[0]
    pastElections.value = electionList[1]

    const account = await getAccounts()
    walletAddr.value = account[0]

    isLoading.value = false
})

const isAdmin = computed(() => {
    if (walletAddr.value) return walletAddr.value === ownerAddress
    return false
})

function getElectionActionLabel(hasVoted) {
    if (hasVoted) return 'View'
    return 'Vote'
}

async function getElectionList() {
    const elections = await getElections()
    const incomingElections = []
    const pastElections = []
    const nowEpoc = new Date().getTime() / 1000

    elections.forEach((election) => {
        const endDate = utils.toNumber(election.endDate)
        const hasClosed = nowEpoc > endDate

        const electionObj = {
            id: utils.toNumber(election.id),
            name: election.name,
            endDate: new Date(endDate * 1000).toLocaleString(),
            hasVoted: election.hasVoted,
            hasClosed: hasClosed
        }

        if (hasClosed) {
            pastElections.push(electionObj)
        } else {
            incomingElections.push(electionObj)
        }
    })

    return [incomingElections, pastElections]
}
</script>

<style scoped>
#elections {
    max-width: 900px;
}

.elections-list {
    min-width: 300px;
}
</style>
