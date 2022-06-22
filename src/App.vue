<script setup lang="ts">
import Header from './components/Header.vue'
</script>

<template>
  <div id="app" class="flex flex-col flex-1 h-full bg-gray-700">
    <div class="flex flex-col h-full">
      <Header />
      <Suspense>
        <template #default>
          <router-view />
        </template>
        <template #fallback>
          <span>Loading...</span>
        </template>
      </Suspense>
    </div>
  </div>
</template>
