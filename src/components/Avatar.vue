<script setup lang="ts">
import { useUserStore } from '@/store'

const userStore = useUserStore()
const user = userStore
</script>

<template>
  <span
    v-if="user.name"
    class="inline-flex items-center justify-center w-10 h-10 bg-gray-500 rounded-full cursor-pointer"
  >
    <span class="font-medium leading-none text-white">{{ user.name.slice(0, 1) }}</span>
  </span>

  <span v-else class="inline-block w-10 h-10 overflow-hidden bg-gray-100 rounded-full cursor-pointer">
    <svg class="w-full h-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
      <path
        d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  </span>
</template>
