<script setup lang="ts">
const props = defineProps<{
  rating: string
}>()
</script>

<template>
  <div
    class="flex items-center content-center text-xs font-semibold text-center text-black bg-green-300 rounded-full w-9 h-9"
  >
    <span class="w-full">{{ props.rating }}</span>
  </div>
</template>
