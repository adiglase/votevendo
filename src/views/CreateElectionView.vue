<script setup>
import TheHeader from '@/components/TheHeader.vue'

import { useToast } from 'primevue/usetoast'
import { reactive } from 'vue'
import { ref } from 'vue'
import { FilterMatchMode } from 'primevue/api'

const toast = useToast()

const form = reactive({
  name: '',
  startDate: '',
  endDate: '',
  voterList: ''
})
const dt = ref()
const addresses = ref([])
const selectedAddresses = ref()
const addressToAdd = ref()

const candidates = ref([])
const selectedCandidates = ref()
const candidateToAdd = ref()

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS }
})

function addCandidate() {
  if (candidateToAdd.value) {
    if (!candidates.value.some((val) => val.name === candidateToAdd.value)) {
      candidates.value.push({
        name: candidateToAdd.value.trim()
      })
      candidateToAdd.value = ''
    } else {
      toast.add({ severity: 'error', summary: 'Fail', detail: 'Candidates exist' })
    }
  }
}

function deleteSelectedCandidates() {
  candidates.value = candidates.value.filter((val) => !selectedCandidates.value.includes(val))
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
    if (!addresses.value.some((val) => val.address === addressToAdd.value)) {
      addresses.value.push({
        address: addressToAdd.value.trim()
      })
      addressToAdd.value = ''
    } else {
      toast.add({ severity: 'error', summary: 'Fail', detail: 'Addresses exist' })
    }
  }
}

function deleteSelectedAddresses() {
  addresses.value = addresses.value.filter((val) => !selectedAddresses.value.includes(val))
  selectedAddresses.value = null
  toast.add({ severity: 'success', summary: 'Successful', detail: 'Addresses Deleted', life: 3000 })
}
</script>

<template>
  <div class="w-full container px-4 py-6">
    <TheHeader></TheHeader>

    <div id="create-election-form" class="my-4 text-900">
      <form class="m-auto">
        <div class="mb-3 flex flex-column">
          <label for="username" class="block mb-3">Name</label>
          <InputText id="username" v-model="form.name" />
        </div>

        <div class="mb-3 card flex flex-wrap gap-3 p-fluid">
          <div class="flex-auto">
            <label for="start-date" class="block mb-2">Start Date</label>
            <Calendar id="start-date" v-model="form.startDate" showTime hourFormat="24" />
          </div>
          <div class="flex-auto">
            <label for="end-date" class="block mb-2">End Date</label>
            <Calendar id="end-date" v-model="form.endDate" showTime hourFormat="24" />
          </div>
        </div>

        <div class="mb-6 flex flex-column">
          <DataTable
            ref="dt"
            :value="candidates"
            v-model:selection="selectedCandidates"
            dataKey="name"
            :filters="filters"
          >
            <template #header>
              <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
                <div>
                  <InputGroup>
                    <InputText v-model="candidateToAdd" placeholder="Add candidates" />
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

            <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
            <Column field="name" header="Candidate" style="min-width: 16rem"></Column>
          </DataTable>
        </div>

        <div class="mb-3 flex flex-column">
          <DataTable
            ref="dt"
            :value="addresses"
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
              <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
                <h4 class="m-0">Voters</h4>

                <div>
                  <InputGroup>
                    <InputText v-model="addressToAdd" placeholder="Add voter address" />
                    <Button icon="pi pi-plus" @click="addAddress" />
                  </InputGroup>
                </div>

                <IconField iconPosition="left">
                  <InputIcon>
                    <i class="pi pi-search" />
                  </InputIcon>
                  <InputText v-model="filters['global'].value" placeholder="Search..." />
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

            <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
            <Column field="address" header="Address" style="min-width: 16rem"></Column>
          </DataTable>
        </div>

        <div class="flex justify-content-end">
          <Button label="Cancel" severity="secondary" />
          <Button label="Submit" class="ml-2" />
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
form {
  max-width: 900px;
}
</style>
