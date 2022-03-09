<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{ secondary?: boolean }>(), {
  secondary: false,
})

const themeClasses = computed(() =>
  props.secondary
    ? 'bg-green-300 hover:bg-pink-600 hover:text-white'
    : 'bg-pink-600 hover:bg-green-300 hover:text-gray-600'
)
</script>

<template>
  <button class="rounded-sm py-1 px-4 text-lg ease-in duration-150" :class="themeClasses">
    <slot />
  </button>
</template>
