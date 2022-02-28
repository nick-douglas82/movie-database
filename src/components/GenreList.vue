<script setup lang="ts">
type Genre = {
  id: number
  name: string
}

const props = defineProps<{
  genres: Genre[]
}>()
</script>

<template>
  <span>
    <template v-for="(genre, index) in genres">
      {{ genre.name }}<template v-if="index !== Object.keys(genres).length - 1">, </template>
    </template>
  </span>
</template>
