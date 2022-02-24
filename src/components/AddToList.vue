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

    <template v-if="isSignedIn">
      <select class="w-full mb-8 text-black rounded-sm h-7">
        <option selected disabled>Select a list</option>
        <option>Nick List</option>
        <option>Nick List2</option>
        <option>Nick List3</option>
      </select>

      <p class="text-sm font-bold mb-2">Or create a new list</p>

      <input type="text" placeholder="List name" class="px-2 rounded-sm h-7 w-full" />
      <ButtonBase>Create &amp; Add</ButtonBase>
    </template>

    <SignIn v-else />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import SignIn from '@/components/SignIn.vue'
import ButtonBase from '@/components/ButtonBase.vue'

export default defineComponent({
  components: {
    SignIn,
    ButtonBase,
  },
  setup() {
    const isActive = ref(false)
    const isSignedIn = ref(false)

    const openModal = () => (isActive.value = true)
    const closeModal = () => (isActive.value = false)

    return {
      isActive,
      isSignedIn,
      openModal,
      closeModal,
      SignIn,
      ButtonBase,
    }
  },
})
</script>
