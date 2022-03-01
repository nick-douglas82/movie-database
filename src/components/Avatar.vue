<script setup lang="ts">
import { useUserStore } from '@/store'

const userStore = useUserStore()
const user = userStore.user
</script>

<template>
  <span
    v-if="user.displayName"
    class="cursor-pointer inline-flex items-center justify-center h-10 w-10 rounded-full bg-gray-500"
  >
    <span class="font-medium leading-none text-white">TW</span>
  </span>

  <span v-else class="cursor-pointer inline-block h-10 w-10 rounded-full overflow-hidden bg-gray-100">
    <svg class="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
      <path
        d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  </span>
</template>
