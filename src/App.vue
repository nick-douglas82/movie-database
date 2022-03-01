<script setup lang="ts">
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useUserStore } from '@/store'
import Header from './components/Header.vue'

const auth = getAuth()

const mainStore = useUserStore()
onAuthStateChanged(auth, userCredential => {
  if (userCredential) {
    mainStore.isLoggedIn = true
    mainStore.user = userCredential
  } else {
    mainStore.isLoggedIn = false
    mainStore.user = {}
  }
})
</script>

<template>
  <div id="app" class="h-full flex flex-col flex-1 bg-gray-700">
    <div class="h-full flex flex-col">
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
