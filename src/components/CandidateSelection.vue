<template>
    <form class="vote-section block mx-auto my-4 flex flex-column justify-content-center">
        <h3 class="text-center">{{ electionName }}</h3>
        <p class="text-center text-500 text-sm">Deadline: {{ electionDeadline }}</p>

        <div class="flex justify-content-center mt-2">
            <SelectButton
                :disabled="isCanVote"
                class="w-full grid grid"
                v-model="selectedCandidate"
                :options="candidateOptions"
                option-label="name"
                :pt="{ button: { class: 'vote-btn col-12 md:col-6 p-2' } }"
            />
        </div>
        <div class="flex mt-4">
            <Button
                class="block ml-auto"
                severity="secondary"
                label="Cancel"
                @click="router.push({ name: 'dashboard' })"
            />
            <Button
                :disabled="isCanVote"
                class="block ml-2"
                label="Vote"
                @click="onSubmitVote"
                :loading="isSubmittingData"
            />
        </div>
    </form>
</template>

<script setup>
import router from '@/router'
import { vote } from '@/services/election'
import { epochDateTimeToRegular, regularDateTimeToEpoch } from '@/utils'
import { useToast } from 'primevue/usetoast'
import { computed, ref, toRaw, watch } from 'vue'
import { useRoute } from 'vue-router'
import { utils } from 'web3'

const route = useRoute()

const props = defineProps(['electionDetail'])

const toast = useToast()

const id = utils.toNumber(route.params.id)

const isSubmittingData = ref(false)
const hasVoted = ref(false)

const electionName = ref('')
const selectedCandidate = ref({})
const candidateOptions = ref([])
const electionDeadline = ref('')

watch(
    () => props.electionDetail,
    (newVal) => {
        populateElectionDetail(newVal)
    },
    { immediate: true }
)

const isCanVote = computed(() => {
    return hasVoted.value || props.electionDetail.endDate < regularDateTimeToEpoch(new Date())
})

function populateElectionDetail(electionDetail) {
    hasVoted.value = electionDetail.hasVoted
    electionName.value = electionDetail.name
    candidateOptions.value = electionDetail.candidates
    electionDeadline.value = epochDateTimeToRegular(electionDetail.endDate)

    if (hasVoted.value) {
        const votedCandidate = toRaw(candidateOptions.value).filter(
            (candidate) => candidate.value === electionDetail.votedChoice
        )

        selectedCandidate.value = votedCandidate[0]
    }
}

async function onSubmitVote() {
    isSubmittingData.value = true

    if (Object.keys(selectedCandidate.value).length === 0) {
        toast.add({
            severity: 'error',
            summary: 'Fail',
            detail: 'Choose the candidate!',
            life: 3000
        })
        isSubmittingData.value = false
        return
    }

    try {
        const res = await vote({
            electionId: utils.toNumber(id),
            candidateId: utils.toNumber(selectedCandidate.value.value)
        })

        if (res) {
            router.push({ name: 'dashboard' })
            toast.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Successfully voted',
                life: 3000
            })
        }
    } catch (err) {
        console.log(err.message)
    }

    isSubmittingData.value = false
}
</script>

<style>
form.vote-section {
    max-width: 600px;
}

form.vote-section h3,
form.vote-section p {
    margin-top: 0;
    margin-bottom: 14px;
}

.vote-btn {
    height: 80px !important;
    background: transparent;
    border: unset;
}

.vote-btn::before {
    border: solid 1px #64748b;
}

.vote-btn.p-highlight::before {
    background: var(--primary-color);
    border: none;
}

.vote-btn.p-highlight span {
    color: white;
}
</style>
