<script setup lang="ts">
import { computed } from 'vue'

const {
  isMobile,
} = useWindowSize()

const router = useRouter()
const route = useRoute()

const currentPath = computed(() => route.path)

function changeRoute(path: string) {
  router.push(path)
}
</script>

<template>
  <div class="flex items-start">
    <Button
      icon="pi pi-bookmark-fill" class="flex-1 mr-2" severity="contrast" :label="isMobile ? undefined : 'Saved'" @click="changeRoute('/me/likes')"
    />
    <div class="flex gap-2 mb-4 flex-8">
      <Button
        class="flex-1" :class="currentPath === '/' ? 'active' : 'inactive'" icon="pi pi-image"
        :label="isMobile ? undefined : 'Singles'" @click="changeRoute('/')"
      />
      <Button
        class="flex-1" :class="currentPath === '/sets' ? 'active' : 'inactive'" icon="pi pi-images"
        :label="isMobile ? undefined : 'Sets'" @click="changeRoute('/sets')"
      />
      <Button
        class="flex-1" :class="currentPath === '/collections' ? 'active' : 'inactive'" icon="pi pi-folder"
        :label="isMobile ? undefined : 'Collections'" @click="changeRoute('/collections')"
      />
    </div>
  </div>
</template>

<style scoped>
.inactive {
  background-color: var(--p-primary-200) !important;
  border-color: var(--p-primary-200) !important;
}
</style>
