<script setup lang="ts">
import { Ref, ref } from 'vue'
import { useRouter } from 'vue-router'
import ButtonBase from '@/components/ButtonBase.vue'
import { logInUser } from '../lib/api/user'
import { useUserStore } from '@/store'

const router = useRouter()

const email: Ref<string> = ref('')
const password: Ref<string> = ref('')

const signIn = async () => {
  logInUser(email.value, password.value).then(user => {
    const userStore = useUserStore()
    userStore.logUserIn(user)
    router.push('/')
  })
}
</script>

<template>
  <div class="flex flex-col items-center justify-center h-full">
    <div class="max-w-md -mt-24">
      <h2 class="mb-4 text-2xl font-light text-center text-white">Login</h2>
      <!-- <div
        class="relative px-4 py-3 mb-2 text-red-700 bg-red-100 border border-red-400 rounded"
        role="alert"
        v-if="errMsg"
      >
        {{ errMsg }}
      </div> -->
      <input
        type="text"
        class="w-full px-2 mb-3 text-gray-600 rounded-sm h-9"
        v-model="email"
        placeholder="Email"
        required
      />
      <input
        type="password"
        class="w-full px-2 mb-3 text-gray-600 rounded-sm h-9"
        v-model="password"
        placeholder="Password"
        required
      />
      <ButtonBase class="text-white" @click="signIn()">Login</ButtonBase>
    </div>
  </div>
</template>
