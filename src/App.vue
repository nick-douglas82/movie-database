<script setup lang="ts">
import Header from "./components/Header.vue";
import { SearchIcon, FilmIcon, DesktopComputerIcon } from "@heroicons/vue/outline";
</script>

<template>
  <div id="app" class="h-full p-10">
    <div class="flex flex-col flex-1 bg-white h-full p-5">
      <Header />
      <router-view />
    </div>
  </div>
</template>
