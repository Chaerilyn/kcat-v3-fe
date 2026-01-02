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
      class="flex-1 mr-2" icon="pi pi-home" severity="contrast" @click="changeRoute('/')"
    />
    <div class="flex gap-2 mb-4 flex-8">
      <Button
        class="flex-1" :class="currentPath === '/uploads' ? 'active' : 'inactive'" icon="pi pi-cloud-upload"
        :label="isMobile ? undefined : 'New Upload'" @click="changeRoute('/uploads')"
      />
      <Button
        class="flex-1" :class="currentPath === '/me/uploads' ? 'active' : 'inactive'" icon="pi pi-pen-to-square"
        :label="isMobile ? undefined : 'My Uploads'" @click="changeRoute('/me/uploads')"
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
