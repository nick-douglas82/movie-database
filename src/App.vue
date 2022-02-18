<script setup lang="ts">
import Header from './components/Header.vue'
</script>

<template>
  <div id="app" class="h-full flex flex-col flex-1 bg-gray-700">
    <div>
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
