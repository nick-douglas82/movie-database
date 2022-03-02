<script setup lang="ts">
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useListsStore, useUserStore } from '@/store'
import { getAllLists } from '@/lib/api/lists'
import Header from './components/Header.vue'

const auth = getAuth()

const listsStore = useListsStore()
const userStore = useUserStore()
onAuthStateChanged(auth, userCredential => {
  if (userCredential) {
    userStore.isLoggedIn = true
    userStore.user = userCredential

    getAllLists(userStore.user.uid).then(lists => (listsStore.lists = lists.data))
  } else {
    userStore.isLoggedIn = false
    userStore.user = {}
    listsStore.lists = []
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
