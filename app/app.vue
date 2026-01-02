<script setup lang="ts">
import Toast from 'primevue/toast'
import { onMounted } from 'vue'

const settingsStore = useSettingsStore()

onMounted(async () => {
  await settingsStore.settingsLoad()
})
</script>

<template>
  <div class="darkmode">
    <img
      src="~/assets/background.svg"
      alt="Background"
      class="w-full h-[250px] absolute top-0 left-0 z-[-1] transform rotate-180 opacity-50"
    >
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <Toast />
    <ScrollTop />
  </div>
</template>
