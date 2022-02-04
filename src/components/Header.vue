<script setup lang="ts">
import { DatabaseIcon } from '@heroicons/vue/solid'
</script>

<template>
  <header class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full py-4 flex justify-between">
    <router-link to="/" class="flex items-center text-pink-600">
      <DatabaseIcon class="w-12 h-12 text-current" />
      <p
        class="text-2xl font-extrabold sm:text-3xl sm:tracking-tight lg:text-3xl text-center leading-none text-current"
      >
        NDMD
      </p>
      <p class="text-xs mt-auto mb-2 ml-1">Vue3</p>
    </router-link>
    <input type="text" class="border border-pink-600 px-6 py-2 rounded-full bg-gray-100 text-sm" placeholder="Search" />
  </header>
</template>
