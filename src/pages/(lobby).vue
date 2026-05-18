<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div
    class="flex min-h-full flex-1 flex-col items-center justify-center gap-8 px-4 py-8"
  >
    <h1 class="text-2xl font-semibold tracking-tight text-neutral-100 sm:text-3xl">
      Lobby
    </h1>
    <div class="flex w-full max-w-sm flex-col gap-4 sm:max-w-xs">
      <RouterLink
        :to="{ name: '/match' }"
        class="rounded-xl bg-cyan-500 px-8 py-4 text-center text-lg font-semibold text-white shadow-lg shadow-cyan-900/40 transition-colors hover:bg-cyan-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
      >
        Match
      </RouterLink>
      <RouterLink
        :to="{ name: '/result' }"
        class="rounded-xl border-2 border-cyan-400/50 bg-cyan-950/30 px-8 py-3.5 text-center text-base font-medium text-cyan-100 transition-colors hover:border-cyan-300 hover:bg-cyan-900/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
      >
        Result
      </RouterLink>
    </div>
  </div>
</template>
