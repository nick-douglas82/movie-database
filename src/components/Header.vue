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
    <button v-if="!isLoggedIn" class="ml-4 text-white flex items-center content-center">
      Sign in <LoginIcon class="w-5 h-5 text-current ml-1" />
    </button>
    <img
      v-else
      class="ml-4 inline-block h-10 w-10 rounded-full"
      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      alt=""
    />
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store'
import { DatabaseIcon } from '@heroicons/vue/solid'
import { LoginIcon } from '@heroicons/vue/outline'

export default defineComponent({
  components: {
    DatabaseIcon,
    LoginIcon,
  },
  setup() {
    const userStore = useUserStore()
    const { isLoggedIn } = storeToRefs(userStore)

    return {
      DatabaseIcon,
      LoginIcon,
      isLoggedIn,
    }
  },
})
</script>
