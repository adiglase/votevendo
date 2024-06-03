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
                                                    {{ election.deadline }}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="flex flex-column md:align-items-end gap-5">
                                            <div class="flex flex-row-reverse md:flex-row gap-2">
                                                <Button
                                                    size="small"
                                                    label="Vote"
                                                    class="flex-auto md:flex-initial white-space-nowrap"
                                                ></Button>
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
                                                    {{ election.deadline }}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="flex flex-column md:align-items-end gap-5">
                                            <div class="flex flex-row-reverse md:flex-row gap-2">
                                                <Button
                                                    size="small"
                                                    label="View"
                                                    class="flex-auto md:flex-initial white-space-nowrap"
                                                    severity="info"
                                                ></Button>
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
import { onMounted, ref } from 'vue'

const incomingElections = ref([])
const pastElections = ref([])
const isLoading = ref(false)

onMounted(async () => {
    isLoading.value = true

    const electionList = await getElectionList()

    incomingElections.value = electionList[0]
    pastElections.value = electionList[1]

    isLoading.value = false
})

async function getElectionList() {
    const elections = await getElections()
    const incomingElections = []
    const pastElections = []

    elections.forEach((election) => {
        const deadline = utils.toNumber(election.deadline)
        const hasClosed = Date.now() > deadline

        const electionObj = {
            id: utils.toNumber(election.id),
            name: election.name,
            deadline: new Date(deadline * 1000).toLocaleString(),
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
