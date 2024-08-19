<template>
    <div class="w-full container">
        <TheHeader></TheHeader>

        <div class="vote-container">
            <ProgressSpinner
                v-if="isLoadingData"
                style="width: 50px; height: 50px"
                class="mt-4 mx-auto block"
            />

            <CandidateSelection v-if="!isLoadingData" :electionDetail="electionData" />
            <VoteResult
                v-if="!isLoadingData && electionData.hasEnded"
                :electionData="electionData"
            />
        </div>
    </div>
</template>

<script setup>
import { getElectionDetail } from '@/services/election'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { utils } from 'web3'

const route = useRoute()
const id = utils.toNumber(route.params.id)

const isLoadingData = ref(false)
const electionData = ref({})

onMounted(async () => {
    isLoadingData.value = true

    const electionDetail = await getElectionDetail({
        electionId: id,
        isIncludeVoter: false,
        isIncludeResult: false
    })

    electionData.value = {
        id: utils.toNumber(electionDetail.id),
        name: electionDetail.name,
        candidates: formatCandidateOptions(electionDetail.candidates),
        startDate: utils.toNumber(electionDetail.startDate),
        endDate: utils.toNumber(electionDetail.endDate),
        hasVoted: electionDetail.hasVoted,
        votedChoice: utils.toNumber(electionDetail.votedChoice),
        results: electionDetail.results.map((res) => utils.toNumber(res)),
        voterChoices: electionDetail.voterChoices.map((res) => utils.toNumber(res)),
        voterList: electionDetail.voterList,
        hasEnded: electionDetail.hasEnded
    }
    isLoadingData.value = false
})

function formatCandidateOptions(candidates) {
    return candidates.map((candidate) => {
        return {
            name: candidate.name,
            value: utils.toNumber(candidate.id)
        }
    })
}
</script>

<style scoped>
.vote-container {
    display: block;
    margin: auto;
    max-width: 800px;
}
</style>
