<script setup>
const products = [
  {
    id: '1000',
    code: 'f230fh0g3',
    name: 'Bamboo Watch',
    description: 'Product Description',
    image: 'bamboo-watch.jpg',
    price: 65,
    category: 'Accessories',
    quantity: 24,
    inventoryStatus: 'INSTOCK',
    rating: 5
  },
  {
    id: '2000',
    code: 'f230fh0g3',
    name: 'Badmf wdwoierhwo i Watch',
    description: 'Product Description',
    image: 'bamboo-watch.jpg',
    price: 65,
    category: 'Accessories',
    quantity: 24,
    inventoryStatus: 'INSTOCK',
    rating: 5
  },
  {
    id: '3000',
    code: 'f230fh0g3',
    name: 'Bamboo Watch',
    description: 'Product Description',
    image: 'bamboo-watch.jpg',
    price: 65,
    category: 'Accessories',
    quantity: 24,
    inventoryStatus: 'INSTOCK',
    rating: 5
  }
]
</script>

<template>
  <div class="w-full container px-4 py-6">
    <div id="title">
      <h1 class="text-6xl font-bold">
        VendoVote<br />
        Dashboard
      </h1>
      <p class="text-700 my-2">
        Participate in vendor selection with confidence using our secure platform.
      </p>
      <p class="text-500 text-sm">0x620...e292F7 | Connected With Metamask</p>
    </div>

    <div id="elections" class="mt-8 flex flex-wrap gap-4">
      <Card class="elections-list flex-1">
        <template #title><h4 class="font-bold">Incoming Vendor Elections</h4></template>
        <template #content>
          <DataView :value="products">
            <template #list="slotProps">
              <div v-for="(item, index) in slotProps.items" :key="index">
                <div class="flex flex-row align-items-center py-2">
                  <div class="flex flex-row justify-content-between align-items-center flex-1">
                    <div
                      class="flex flex-row md:flex-column justify-content-between align-items-start"
                    >
                      <div>
                        <div class="font-medium text-900">{{ item.name }}</div>
                      </div>
                      <div>
                        <div class="text-xs font-light">15 May 2024 20:22:22</div>
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
        <template #title><h4 class="font-bold">Past Vendor Elections</h4></template>
        <template #content>
          <DataView :value="products">
            <template #list="slotProps">
              <div v-for="(item, index) in slotProps.items" :key="index">
                <div class="flex flex-row align-items-center py-2">
                  <div class="flex flex-row justify-content-between align-items-center flex-1">
                    <div
                      class="flex flex-row md:flex-column justify-content-between align-items-start"
                    >
                      <div>
                        <div class="font-medium text-900">{{ item.name }}</div>
                      </div>
                      <div>
                        <div class="text-xs font-light">15 May 2024 20:22:22</div>
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

<style scoped>
#title {
  display: block;
  margin: 0 auto;
  width: 600px;
  max-width: 100%;
  text-align: center;
}

.elections-list {
  min-width: 300px;
}
</style>
