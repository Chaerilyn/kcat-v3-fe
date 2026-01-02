<script setup lang="ts">
</script>

<template>
  <div class="min-h-screen max-w-[90rem] mx-auto flex flex-col p-6 mb-20">
    <Header />
    <main class="container mx-auto px-4 pb-8">
      <slot />
    </main>
  </div>
</template>
