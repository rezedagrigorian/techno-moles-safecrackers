<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="flex min-h-full flex-1 flex-col items-center justify-center gap-6 px-4 py-8">
    <h1 class="text-2xl font-semibold tracking-tight text-neutral-100">
      Результат
    </h1>
    <RouterLink
      :to="{ name: '/(lobby)' }"
      class="rounded-lg px-4 py-2 text-sm font-medium text-cyan-200/90 underline-offset-4 transition-colors hover:text-cyan-50 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
    >
      ← Back to lobby
    </RouterLink>
  </div>
</template>
