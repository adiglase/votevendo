<script setup></script>

<template>
  <div id="title">
    <h1 class="text-6xl font-bold mt-0 mb-2">
      VendoVote<br />
      <span class="text-primary font-bold">{{ $route.meta.pageName }}</span>
    </h1>
    <p class="text-700 my-0">
      Participate in vendor selection with confidence using our secure platform.
    </p>
    <p class="text-500 text-sm">0x620...e292F7 | Connected With Metamask</p>
  </div>
</template>

<style scoped>
#title {
  display: block;
  margin: 0 auto;
  width: 600px;
  max-width: 100%;
  text-align: center;
}
</style>
