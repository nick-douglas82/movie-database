
<script setup lang="ts">
// import Header from './components/Header.vue';
</script>

<template>
  <div id="app" class="mt-20">
    <router-view />
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
    </div>
  </div>
</template>
