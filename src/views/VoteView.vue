<script setup>
import { ref } from 'vue'

const value = ref('')
const options = ref(['Option 1', 'Option 2', 'Option 3'])
</script>

<template>
  <div class="w-full container px-4 py-6">
    <TheHeader></TheHeader>

    <form class="vote-section block mx-auto my-4 flex flex-column justify-content-center">
      <h3 class="text-center">Title of the election</h3>
      <p class="text-center text-500 text-sm">Deadline: 12 March 2024 13:30:20</p>

      <div class="flex justify-content-center mt-2">
        <SelectButton
          class="w-full grid grid"
          v-model="value"
          :options="options"
          :pt="{ button: { class: 'vote-btn col-12 md:col-6 p-2' } }"
        />
      </div>
      <div class="flex mt-4">
        <Button class="block ml-auto" severity="secondary" label="Cancel" />
        <Button class="block ml-2" label="Vote" />
      </div>
    </form>
  </div>
</template>

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
