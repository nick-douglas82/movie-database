<template>
  <nav class="border-b border-gray-800">
    <div class="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 py-6">
      <ul class="flex flex-col md:flex-row items-center">
        <li class="md:ml-16 mt-3 md:mt-0">Test</li>
      </ul>

      <div class="flex flex-col md:flex-row items-center"></div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
