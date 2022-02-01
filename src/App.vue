<script setup lang="ts">
import Header from './components/Header.vue'
import { SearchIcon, FilmIcon, DesktopComputerIcon } from '@heroicons/vue/outline'
</script>

<template>
  <div id="app" class="h-full p-6 overflow-hidden">
    <div class="flex flex-col flex-1 bg-white h-full p-5 overflow-y-auto">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <Header />
        <router-view />
      </div>
    </div>
  </div>
</template>
