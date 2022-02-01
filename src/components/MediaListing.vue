<template>
  <slot />
  <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
    <li v-for="mediaItem in media">
      <Card :value="mediaItem" />
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { formatDate } from '@/lib/date'
import Card from '@/components/Card.vue'
import type { Media } from '@/types/media'

export default defineComponent({
  props: {
    media: {
      type: Object as PropType<Media[]>,
      default: null,
    },
  },
  components: {
    Card,
  },
  setup() {
    return {
      formatDate,
    }
  },
})
</script>
