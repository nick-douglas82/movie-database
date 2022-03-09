<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useListsStore, useUserStore } from '@/store'
import { addToList, createListWithMedia } from '@/lib/api/lists'
import SignIn from '@/components/SignIn.vue'
import ButtonBase from '@/components/ButtonBase.vue'
import { MediaItem } from '@/lib/format'

const props = defineProps<{
  mediaItem: MediaItem
}>()

const userStore = useUserStore()
const listsStore = useListsStore()
const isActive = ref(false)
const listName = ref('')
const selectedList = ref(null)
const { isLoggedIn } = storeToRefs(userStore)

const openModal = () => (isActive.value = true)
const closeModal = () => (isActive.value = false)

const createListAddMovie = () => {
  createListWithMedia(userStore.user.uid, listName.value, props.mediaItem).then(list => {
    listsStore.lists.push(list)
    listName.value = ''
  })
}

const addToExistingList = () => {
  addToList(selectedList.value, props.mediaItem).then(mediaItem => {
    const listInStore = listsStore.lists.find(media => media.id === selectedList.value)
    listInStore?.media.push(mediaItem)
    selectedList.value = null
  })
}
</script>

<template>
  <div
    class="cursor-pointer z-30 bg-pink-600 rounded-full text-white text-3xl w-9 h-9 flex items-center content-center text-center top-3 left-1 absolute hover:bg-green-300 hover:text-black transition ease-in-out duration-500"
    @click="openModal"
  >
    <span class="w-full relative" style="top: -2px">+</span>
  </div>
  <div
    v-if="isActive"
    class="rounded-md overflow-hidden mt-2 mb-12 z-50 overlay absolute inset-0 bg-gray-800/90 text-white p-4 text-center flex items-center flex-col justify-center"
  >
    <button
      class="text-white font-light top-0 right-1 text-4xl absolute hover:text-green-300 ease-in duration-150"
      @click="closeModal"
    >
      &times;
    </button>

    <template v-if="isLoggedIn">
      <template v-if="listsStore.lists.length > 0">
        <select @change="addToExistingList" v-model="selectedList" class="w-full mb-8 text-black rounded-sm h-7">
          <option disabled :value="null">Select a list</option>
          <option v-for="(list, index) in listsStore.lists" :value="list.id">{{ list.title }}</option>
        </select>

        <p class="text-sm font-bold mb-2">Or create a new list &amp; add movie</p>
      </template>
      <p v-else class="text-sm font-bold mb-2">Create a new list &amp; add movie</p>

      <input v-model="listName" type="text" placeholder="List name" class="text-gray-600 px-2 rounded-sm h-7 w-full" />
      <ButtonBase @click="createListAddMovie">Create &amp; Add</ButtonBase>
    </template>

    <SignIn v-else />
  </div>
</template>
