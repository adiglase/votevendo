<script setup>
import TheHeader from '@/components/TheHeader.vue'
import { reactive } from 'vue'

const form = reactive({
  name: ''
})
</script>

<template>
  <div class="w-full container px-4 py-6">
    <TheHeader></TheHeader>

    <div id="create-election-form" class="my-4 text-900">
      <form class="m-auto">
        <FloatLabel>
          <InputText id="username" v-model="form.name" />
          <label for="username">Username</label>
        </FloatLabel>
      </form>
    </div>
  </div>
</template>

<style scoped>
form {
  max-width: 900px;
}
</style>
