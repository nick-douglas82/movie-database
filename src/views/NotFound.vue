<script setup lang="ts">

</script>

<template>
  <div class="px-4 py-16 mx-auto text-center max-w-7xl sm:px-6 sm:py-24 lg:px-8 lg:py-48">
    <p class="text-sm font-semibold tracking-wide text-white text-opacity-50 uppercase">404 error</p>
    <h1 class="mt-2 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Uh oh! I think you’re lost.</h1>
    <p class="mt-2 text-lg font-medium text-white text-opacity-50">It looks like the page you’re looking for doesn't exist.</p>
    <div class="mt-6">
      <router-link to="/" class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-pink-600 border border-transparent rounded-md hover:bg-green-300 hover:text-gray-600">Go back home</router-link>
    </div>
  </div>
</template>
