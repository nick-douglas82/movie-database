<script setup lang="ts">
import { Ref, ref, watch } from 'vue'
import { useListsStore, useUserStore } from '@/store'
import { createNewList, ListWithMedia } from '@/lib/api/lists'
import { Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import ButtonBase from '@/components/ButtonBase.vue'
import { XIcon } from '@heroicons/vue/outline'

const userStore = useUserStore()
const listsStore = useListsStore()
const emit = defineEmits(['close'])
const props = defineProps<{
  isOpen: boolean
}>()

const open: Ref<boolean> = ref(false)
const listName: Ref<string> = ref('')

const closeModal = () => {
  open.value = false
  emit('close')
}

const createList = () => {
  if (userStore.id) {
    createNewList(Number(userStore.id), listName.value).then(list => {
      listsStore.lists.push(list)
      listName.value = ''
      closeModal()
    })
  }
}

watch(
  () => props.isOpen,
  newVal => (open.value = newVal)
)

open.value = props.isOpen
</script>

<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="fixed inset-0 z-10 overflow-y-auto" @close="closeModal">
      <div class="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <DialogOverlay class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
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
            class="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6"
          >
            <div class="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
              <button type="button" class="text-gray-400 bg-white rounded-md hover:text-gray-500" @click="closeModal">
                <span class="sr-only">Close</span>
                <XIcon class="w-6 h-6" aria-hidden="true" />
              </button>
            </div>
            <div>
              <div class="mt-3 text-center sm:mt-5">
                <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                  Create a new list
                </DialogTitle>
                <div class="mt-2">
                  <input
                    v-model="listName"
                    type="text"
                    placeholder="List name"
                    class="w-full h-12 px-2 text-gray-600 border border-gray-500 rounded-md"
                  />
                </div>
              </div>
            </div>
            <div class="mt-5 text-center sm:mt-6">
              <ButtonBase class="text-white" @click="createList">Create List</ButtonBase>
            </div>
          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
