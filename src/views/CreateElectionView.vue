<template>
    <div class="w-full container">
        <TheHeader></TheHeader>

        <div id="create-election-form" class="my-4 text-900">
            <form class="m-auto" @submit.prevent="onSubmitNewElection">
                <div class="mb-3 flex flex-column">
                    <label for="username" class="block mb-3">Name</label>
                    <InputText id="username" v-model="form.name" required />
                </div>

                <div class="mb-3 card flex flex-wrap gap-3 p-fluid">
                    <div class="flex-auto">
                        <label for="start-date" class="block mb-2">Start Date</label>
                        <Calendar
                            id="start-date"
                            v-model="form.startDate"
                            showTime
                            hourFormat="24"
                            :pt="{ input: { required: true } }"
                        />
                    </div>
                    <div class="flex-auto">
                        <label for="end-date" class="block mb-2">End Date</label>
                        <Calendar
                            id="end-date"
                            :pt="{ input: { required: true } }"
                            v-model="form.endDate"
                            showTime
                            hourFormat="24"
                        />
                    </div>
                </div>

                <div class="mb-6 flex flex-column">
                    <DataTable
                        :value="form.candidates"
                        v-model:selection="selectedCandidates"
                        dataKey="name"
                        :filters="filters"
                    >
                        <template #header>
                            <div
                                class="flex flex-wrap gap-2 align-items-center justify-content-between"
                            >
                                <div>
                                    <InputGroup>
                                        <InputText
                                            v-model="candidateToAdd"
                                            placeholder="Add candidates"
                                        />
                                        <Button icon="pi pi-plus" @click="addCandidate" />
                                    </InputGroup>
                                </div>

                                <Button
                                    label="Delete"
                                    icon="pi pi-trash"
                                    severity="danger"
                                    @click="deleteSelectedCandidates"
                                    :disabled="!selectedCandidates || !selectedCandidates.length"
                                />
                            </div>
                        </template>

                        <Column
                            selectionMode="multiple"
                            style="width: 3rem"
                            :exportable="false"
                        ></Column>
                        <Column field="name" header="Candidate" style="min-width: 16rem"></Column>
                    </DataTable>
                </div>

                <div class="mb-3 flex flex-column">
                    <DataTable
                        :value="form.voterAddresses"
                        v-model:selection="selectedAddresses"
                        dataKey="address"
                        :paginator="true"
                        :rows="10"
                        :filters="filters"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        :rowsPerPageOptions="[5, 10, 25]"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} voters address"
                    >
                        <template #header>
                            <div
                                class="flex flex-wrap gap-2 align-items-center justify-content-between"
                            >
                                <h4 class="m-0">Voters</h4>

                                <div>
                                    <InputGroup>
                                        <InputText
                                            v-model="addressToAdd"
                                            placeholder="Add voter address"
                                        />
                                        <Button icon="pi pi-plus" @click="addAddress" />
                                    </InputGroup>
                                </div>

                                <IconField iconPosition="left">
                                    <InputIcon>
                                        <i class="pi pi-search" />
                                    </InputIcon>
                                    <InputText
                                        v-model="filters['global'].value"
                                        placeholder="Search..."
                                    />
                                </IconField>
                                <Button
                                    label="Delete"
                                    icon="pi pi-trash"
                                    severity="danger"
                                    @click="deleteSelectedAddresses"
                                    :disabled="!selectedAddresses || !selectedAddresses.length"
                                />
                            </div>
                        </template>

                        <Column
                            selectionMode="multiple"
                            style="width: 3rem"
                            :exportable="false"
                        ></Column>
                        <Column field="address" header="Address" style="min-width: 16rem"></Column>
                    </DataTable>
                </div>

                <div class="flex justify-content-end">
                    <Button label="Cancel" severity="secondary" />
                    <Button :loading="isLoading" label="Submit" type="submit" class="ml-2" />
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import TheHeader from '@/components/TheHeader.vue'

import { useToast } from 'primevue/usetoast'
import { reactive } from 'vue'
import { ref, toRaw } from 'vue'
import { FilterMatchMode } from 'primevue/api'
import { createElection } from '@/services/election'

const toast = useToast()

const isLoading = ref(false)

const form = reactive({
    name: '',
    startDate: '',
    endDate: '',
    voterAddresses: [],
    candidates: []
})

const selectedAddresses = ref()
const addressToAdd = ref()

const selectedCandidates = ref()
const candidateToAdd = ref()

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
})

function addCandidate() {
    if (candidateToAdd.value) {
        if (!form.candidates.some((val) => val.name === candidateToAdd.value)) {
            form.candidates.push({
                name: candidateToAdd.value.trim()
            })
            candidateToAdd.value = ''
        } else {
            toast.add({
                severity: 'error',
                summary: 'Fail',
                detail: 'Candidates exist',
                life: 3000
            })
        }
    }
}

function deleteSelectedCandidates() {
    form.candidates = form.candidates.filter((val) => !selectedCandidates.value.includes(val))
    selectedCandidates.value = null
    toast.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Candidates Deleted',
        life: 3000
    })
}

function addAddress() {
    if (addressToAdd.value) {
        if (!form.voterAddresses.some((val) => val.address === addressToAdd.value)) {
            form.voterAddresses.push({
                address: addressToAdd.value.trim()
            })
            addressToAdd.value = ''
        } else {
            toast.add({ severity: 'error', summary: 'Fail', detail: 'Addresses exist', life: 3000 })
        }
    }
}

function deleteSelectedAddresses() {
    form.voterAddresses = form.voterAddresses.filter(
        (val) => !selectedAddresses.value.includes(val)
    )
    selectedAddresses.value = null
    toast.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Addresses Deleted',
        life: 3000
    })
}

function validateForm(nowEpoch, startDateEpoch, endDateEpoch) {
    if (endDateEpoch < nowEpoch) {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'End date must be in the future date',
            life: 3000
        })
        return false
    }

    if (startDateEpoch > endDateEpoch) {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Start date must be < end date',
            life: 3000
        })
        return false
    }

    if (form.candidates.length < 2) {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Need to have atleast 2 candidates',
            life: 3000
        })
        return false
    }

    if (form.voterAddresses.length < 2) {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Need to have atleast 2 voters',
            life: 3000
        })
        return false
    }

    return true
}

async function onSubmitNewElection() {
    isLoading.value = true

    const nowEpoch = new Date() / 1000
    const startDateEpoch = new Date(form.startDate) / 1000
    const endDateEpoch = new Date(form.endDate) / 1000

    if (!validateForm(nowEpoch, startDateEpoch, endDateEpoch)) {
        isLoading.value = false
        return
    }

    await createElection({
        name: form.name,
        startDate: startDateEpoch,
        endDate: endDateEpoch,
        candidates: toRaw(form.candidates).map((candidate) => {
            return candidate['name']
        }),
        voterList: toRaw(form.voterAddresses).map((voter) => {
            return voter['address']
        })
    })

    isLoading.value = false
}
</script>

<style scoped>
form {
    max-width: 900px;
}
</style>
