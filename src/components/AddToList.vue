<script setup lang="ts">
import { Ref, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useListsStore, useUserStore } from '@/store'
import { addToList, createNewList } from '@/lib/api/lists';
import { getListsPopulateStore } from '@/lib/helpers/lists';
import SignIn from '@/components/SignIn.vue'
import ButtonBase from '@/components/ButtonBase.vue'
import { MediaItem } from '@/lib/format'

const props = defineProps<{
  mediaItem: MediaItem
}>()

const userStore = useUserStore()
const listsStore = useListsStore()
const isActive: Ref<boolean> = ref(false)
const listName: Ref<string> = ref('')
const selectedList: Ref<number | null> = ref(null)
const { isLoggedIn } = storeToRefs(userStore)

const openModal = () => (isActive.value = true)
const closeModal = () => (isActive.value = false)

watch(isLoggedIn, (() => {
  if (isLoggedIn.value) {
    getListsPopulateStore()
  }
}))

const createListAddMovie = () => {
  const mediaItem = {
    title: props.mediaItem.title,
    mediaId: props.mediaItem.id,
    type: props.mediaItem.media_type,
    imageUrl: props.mediaItem.poster_path
  }
  if (userStore.user.id) {
    createNewList(userStore.user.id, listName.value, mediaItem).then((list) => {
      listsStore.lists.push(list)
      listName.value = ''
    })
  }
}

const addToExistingList = () => {
  addToList(selectedList.value, props.mediaItem).then(mediaItem => {
    const listInStore = listsStore.lists.find(media => media.id === selectedList.value)
    listInStore?.media.push(mediaItem)
    selectedList.value = null
    closeModal()
  })
}
</script>

<template>
  <div
    class="absolute z-30 flex items-center content-center text-3xl text-center text-white transition duration-500 ease-in-out bg-pink-600 rounded-full cursor-pointer w-9 h-9 top-3 left-1 hover:bg-green-300 hover:text-black"
    @click="openModal"
  >
    <span class="relative w-full" style="top: -2px">+</span>
  </div>
  <div
    v-if="isActive"
    class="absolute inset-0 z-50 flex flex-col items-center justify-center p-4 mt-2 mb-12 overflow-hidden text-center text-white rounded-md overlay bg-gray-800/90"
  >
    <button
      class="absolute top-0 text-4xl font-light text-white duration-150 ease-in right-1 hover:text-green-300"
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

        <p class="mb-2 text-sm font-bold">Or create a new list &amp; add movie</p>
      </template>
      <p v-else class="mb-2 text-sm font-bold">Create a new list &amp; add movie</p>

      <input v-model="listName" type="text" placeholder="List name" class="w-full px-2 mb-4 text-gray-600 rounded-sm h-7" />
      <ButtonBase @click="createListAddMovie">Create &amp; Add</ButtonBase>
    </template>

    <SignIn v-else />
  </div>
</template>
