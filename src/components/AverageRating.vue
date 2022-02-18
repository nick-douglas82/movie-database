<template>
  <div
    class="bg-green-300 rounded-full text-black text-xs w-9 h-9 flex items-center content-center text-center font-semibold"
  >
    <span class="w-full">{{ rating }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    rating: {
      type: Number,
    },
  },
})
</script>
