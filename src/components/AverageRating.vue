<template>
  <div
    class="bg-green-300 rounded-full text-black text-xs w-9 h-9 flex items-center content-center text-center font-semibold"
  >
    <!-- <StarIcon class="fill-current text-orange-500 w-4" /> -->
    <span class="w-full">{{ rating }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { StarIcon } from '@heroicons/vue/solid'

export default defineComponent({
  components: {
    StarIcon,
  },
  props: {
    rating: {
      type: Number,
    },
  },
})
</script>
