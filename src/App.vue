<script setup lang="ts">
import Header from './components/Header.vue'
</script>

<template>
  <div id="app" class="h-full p-6 overflow-hidden">
    <div class="flex flex-col flex-1 bg-white h-full overflow-y-auto">
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
  </div>
</template>
