<script setup lang="ts">
const props = defineProps<{
  rating: number
}>()
</script>

<template>
  <div
    class="bg-green-300 rounded-full text-black text-xs w-9 h-9 flex items-center content-center text-center font-semibold"
  >
    <span class="w-full">{{ props.rating }}</span>
  </div>
</template>
