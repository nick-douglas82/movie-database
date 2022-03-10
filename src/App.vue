<script setup lang="ts">
// import { UserInfo } from '@firebase/auth-types'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useListsStore, useUserStore } from '@/store'
import { getAllLists, ListWithMedia } from '@/lib/api/lists'
import Header from './components/Header.vue'

export interface UserInfo {
  displayName: string | null
  email: string | null
  phoneNumber: string | null
  photoURL: string | null
  providerId: string
  uid: string
}

const auth = getAuth()

const listsStore = useListsStore()
const userStore = useUserStore()
onAuthStateChanged(auth, userCredential => {
  if (userCredential) {
    userStore.isLoggedIn = true
    userStore.user = userCredential
    getAllLists(userStore.user.uid).then(lists => {
      listsStore.lists = lists
    })
  } else {
    userStore.isLoggedIn = false
    userStore.user = <UserInfo>{}
    listsStore.lists = []
  }
})
</script>

<template>
  <div id="app" class="flex flex-col flex-1 h-full bg-gray-700">
    <div class="flex flex-col h-full">
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
