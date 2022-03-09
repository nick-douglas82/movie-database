<script setup lang="ts">
import { getAuth, signOut } from 'firebase/auth'
import { storeToRefs } from 'pinia'
import { useListsStore, useUserStore } from '@/store'
import Avatar from '@/components/Avatar.vue'
import { DatabaseIcon } from '@heroicons/vue/solid'
import { LoginIcon } from '@heroicons/vue/outline'

const userStore = useUserStore()
const auth = getAuth()
const { isLoggedIn } = storeToRefs(userStore)

const signOutOfApp = () => signOut(auth)
</script>

<template>
  <header class="flex items-center justify-between w-full px-4 py-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
    <router-link to="/" class="flex text-white logo">
      <DatabaseIcon class="w-12 h-12 text-current" />
      <p
        class="flex flex-col text-2xl font-extrabold leading-none text-current sm:text-3xl sm:tracking-tight lg:text-3xl"
      >
        NDMD
        <span class="mt-auto mb-2 text-xs font-bold text-green-300">Vue3</span>
      </p>
    </router-link>
    <nav class="flex content-center ml-8 mr-auto">
      <router-link to="/movies" class="flex items-center mr-5 text-white hover:text-green-300">Movies</router-link>
      <router-link to="/tv" class="flex items-center mr-5 text-white hover:text-green-300">TV Series</router-link>
      <router-link to="/lists" class="flex items-center text-white hover:text-green-300">My Lists</router-link>
    </nav>
    <router-link v-if="!isLoggedIn" to="/login" class="flex items-center content-center ml-4 text-white">
      Sign in <LoginIcon class="w-5 h-5 ml-1 text-current" />
    </router-link>
    <Avatar v-else @click="signOutOfApp" />
  </header>
</template>
