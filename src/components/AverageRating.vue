<template>
  <StarIcon class="fill-current text-orange-500 w-4" />
  <span class="ml-1">{{ rating }}</span>
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
