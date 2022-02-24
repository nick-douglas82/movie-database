<script setup lang="ts">
import { DatabaseIcon } from '@heroicons/vue/solid'
</script>

<template>
  <header class="items-center mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full py-4 flex justify-between">
    <router-link to="/" class="logo flex text-white">
      <DatabaseIcon class="w-12 h-12 text-current" />
      <p
        class="flex flex-col text-2xl font-extrabold sm:text-3xl sm:tracking-tight lg:text-3xl leading-none text-current"
      >
        NDMD
        <span class="text-xs mt-auto mb-2 text-green-300 font-bold">Vue3</span>
      </p>
    </router-link>
    <nav class="mr-auto ml-8 flex content-center">
      <router-link to="/movies" class="flex items-center text-white mr-5 hover:text-green-300">Movies</router-link>
      <router-link to="/tv" class="flex items-center text-white hover:text-green-300">TV Series</router-link>
    </nav>
    <input type="text" class="border border-green-300 px-6 h-8 rounded-full bg-gray-100 text-sm" placeholder="Search" />
  </header>
</template>
