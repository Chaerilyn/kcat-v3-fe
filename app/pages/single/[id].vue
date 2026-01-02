<script setup lang="ts">
import { onMounted } from 'vue'

definePageMeta({
  middleware: ['auth'],
})

const route = useRoute()

const itemId = route.params.id as string
const {
  item,
  fetchItem,
} = useFetchItem(itemId)

onMounted(async () => {
  await fetchItem()
})
</script>

<template>
  <NavigationBase class="my-4" />

  <div class="flex justify-center">
    <div v-if="item">
      <div>
        <CardSingleContent :content="item!" />
      </div>
    </div>
    <div v-else>
      <div class="flex justify-center items-center min-h-screen">
        <ProgressSpinner />
      </div>
    </div>
  </div>
</template>
