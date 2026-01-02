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
      class="flex-1 mr-2" icon="pi pi-home" severity="contrast" :label="isMobile ? undefined : 'Home'" @click="changeRoute('/')"
    />
    <div class="flex gap-2 mb-4 flex-8">
      <Button
        class="flex-1" :class="currentPath === '/me/likes' ? 'active' : 'inactive'" icon="pi pi-heart-fill"
        :label="isMobile ? undefined : 'My Likes'" @click="changeRoute('/me/likes')"
      />
      <Button
        class="flex-1" :class="currentPath === '/me/collections' ? 'active' : 'inactive'" icon="pi pi-folder"
        :label="isMobile ? undefined : 'My Collections'" @click="changeRoute('/me/collections')"
      />
    </div>
  </div>
</template>

<style scoped>
.inactive {
  background-color: var(--p-primary-100) !important;
  border-color: var(--p-primary-100) !important;
}
</style>
