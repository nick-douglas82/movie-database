<template>
  <span>
    <template v-for="(genre, index) in genres">
      {{ genre.name }}<template v-if="index !== Object.keys(genres).length - 1">, </template>
    </template>
  </span>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

type Genre = {
  id: number
  name: string
}

export default defineComponent({
  props: {
    genres: {
      type: Object as PropType<Genre[]>,
      default: [],
    },
  },
})
</script>
