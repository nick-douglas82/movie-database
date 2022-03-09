<script setup lang="ts">
import { reactive, ref, unref } from 'vue'
import { deleteList, Media, updateListName } from '@/lib/api/lists'
import { useListsStore, useUserStore } from '@/store'
import { PlusIcon } from '@heroicons/vue/solid'
import ButtonBase from '@/components/ButtonBase.vue'
import Modal from '@/components/Modal.vue'
import ModalEditListName from '@/components/ModalEditListName.vue'
import ContextMenu from '@/components/ContextMenu.vue'

const listsStore = useListsStore()
const userStore = useUserStore()
const modalOpen = ref(false)
const editListNameModalOpen = ref(false)
const selectedList = reactive({
  name: '',
  listId: <null | number>null,
})

const slicedMediaList = (media: Media[]) => media.slice(0, 4)

const editListName = (name: string, listId: number) => {
  editListNameModalOpen.value = true
  selectedList.name = name
  selectedList.listId = listId
}

const updateList = (updatedName: string) => {
  updateListName(userStore.user.uid, selectedList.listId, unref(updatedName)).then(list => {
    const listInStore = listsStore.lists.find(storedList => storedList.id === list.id)

    if (listInStore) {
      listInStore.title = list.title
    }

    selectedList.name = ''
    selectedList.listId = null
    editListNameModalOpen.value = false
  })
}

const deleteListItem = (listId: number) => {
  deleteList(listId).then(() => {
    const updatedLists = listsStore.lists.filter(list => list.id !== listId)
    listsStore.lists = updatedLists
  })
}
</script>

<template>
  <div class="w-full px-4 py-10 mx-auto max-w-7xl sm:px-6 lg:px-8">
    <h2 class="flex items-center content-center mt-12 mb-4 text-lg tracking-wider text-gray-500">
      My Lists
      <span class="flex-1 w-full h-0 ml-6 border border-gray-500"></span>
      <ButtonBase secondary class="ml-5 text-gray-600" @click="modalOpen = true">Create New List</ButtonBase>
    </h2>
    <ul v-if="listsStore.lists.length > 0" class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
      <li class="relative" v-for="(list, index) in listsStore.lists" :key="index">
        <div class="relative mt-2">
          <router-link
            :to="`/list/${list.id}`"
            class="relative grid w-full grid-cols-2 grid-rows-2 gap-0 mt-2 text-lg transition duration-300 ease-in-out bg-gray-600 rounded-md h-96"
          >
            <div
              v-if="list.media.length > 0"
              v-for="(media, index) in slicedMediaList(list.media)"
              class="block w-full h-full"
            >
              <img
                :src="`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${media.imageUrl}`"
                class="object-cover w-full h-full opacity-80"
              />
            </div>
            <div
              v-else
              class="absolute text-4xl font-semibold text-gray-500 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            >
              Empty
            </div>
          </router-link>
          <ContextMenu @editName="editListName(list.title, list.id)" @deleteList="deleteListItem(list.id)" />
          <div class="mt-2">
            <router-link :to="`/list/${list.id}`" class="text-white">
              <p class="block text-base font-light truncate pointer-events-none">
                {{ list.title }}
              </p>
            </router-link>
          </div>
        </div>
      </li>
      <li class="relative">
        <div class="mt-2">
          <div
            class="relative grid w-full grid-cols-2 grid-rows-2 gap-0 mt-2 overflow-hidden text-lg text-gray-400 transition duration-300 ease-in-out bg-gray-600 border-4 border-gray-400 border-dashed rounded-md cursor-pointer h-96 hover:border-gray-500 hover:text-gray-200"
            @click="modalOpen = true"
          >
            <span
              class="absolute flex flex-col items-center justify-center text-center transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 text-inherit"
            >
              <PlusIcon class="w-16 h-16 text-inherit" />
              <p class="text-xl font-semibold text-inherit">Add List</p>
            </span>
          </div>
        </div>
      </li>
    </ul>
    <div v-else>You don't have any lists saved.</div>
  </div>
  <Modal :isOpen="modalOpen" @close="modalOpen = false" />
  <ModalEditListName
    :name="selectedList.name"
    :isOpen="editListNameModalOpen"
    @close="editListNameModalOpen = false"
    @updateListName="updateList"
  />
</template>
