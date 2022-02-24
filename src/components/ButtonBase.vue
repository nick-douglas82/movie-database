<template>
  <button
    class="bg-pink-600 rounded-sm py-1 px-4 text-sm font-semibold mt-3 hover:bg-green-300 hover:text-gray-600 ease-in duration-150"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {},
})
</script>
