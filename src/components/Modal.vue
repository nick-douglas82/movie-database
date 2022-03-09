<script setup lang="ts">
import { ref, watch } from 'vue'
import { useListsStore, useUserStore } from '@/store'
import { createNewList } from '@/lib/api/lists'
import { Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import ButtonBase from '@/components/ButtonBase.vue'
import { XIcon } from '@heroicons/vue/outline'

const userStore = useUserStore()
const listsStore = useListsStore()
const emit = defineEmits(['close'])
const props = defineProps<{
  isOpen: boolean
}>()

const open = ref(false)
const listName = ref('')

const closeModal = () => {
  open.value = false
  emit('close')
}

const createList = () => {
  createNewList(userStore.user.uid, listName.value).then(list => {
    listsStore.lists.push(list)
    listName.value = ''
    closeModal()
  })
}

watch(
  () => props.isOpen,
  newVal => (open.value = newVal)
)

open.value = props.isOpen
</script>

<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="fixed z-10 inset-0 overflow-y-auto" @close="closeModal">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <DialogOverlay class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enter-to="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leave-from="opacity-100 translate-y-0 sm:scale-100"
          leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div
            class="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6"
          >
            <div class="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
              <button type="button" class="bg-white rounded-md text-gray-400 hover:text-gray-500" @click="closeModal">
                <span class="sr-only">Close</span>
                <XIcon class="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div>
              <div class="mt-3 text-center sm:mt-5">
                <DialogTitle as="h3" class="text-lg leading-6 font-medium text-gray-900">
                  Create a new list
                </DialogTitle>
                <div class="mt-2">
                  <input
                    v-model="listName"
                    type="text"
                    placeholder="List name"
                    class="text-gray-600 px-2 rounded-md h-12 w-full border border-gray-500"
                  />
                </div>
              </div>
            </div>
            <div class="mt-5 sm:mt-6 text-center">
              <ButtonBase class="text-white" @click="createList">Create List</ButtonBase>
            </div>
          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
