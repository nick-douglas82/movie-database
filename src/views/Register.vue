<script setup lang="ts">
import { ref } from 'vue'
import 'firebase/auth'
import 'firebase/firestore'
import ButtonBase from '@/components/ButtonBase.vue'
import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth'
import { useRouter } from 'vue-router'

const router = useRouter()

const email = ref('')
const password = ref('')

const register = () => {
  const auth = getAuth()
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(data => router.push('/'))
    .catch(error => {
      console.log(error.code)
      alert(error.message)
    })
}
</script>

<template>
  <div class="flex flex-col h-full justify-center items-center">
    <div class="max-w-md -mt-24">
      <h2 class="text-white text-2xl mb-4 text-center font-light">Create a user account</h2>
      <input
        type="text"
        class="px-2 rounded-sm h-9 w-full mb-3 text-gray-600"
        v-model="email"
        placeholder="Email"
        required
      />
      <input
        type="password"
        class="px-2 rounded-sm h-9 w-full mb-3 text-gray-600"
        v-model="password"
        placeholder="Password"
        required
      />
      <ButtonBase class="text-white" @click="register()">Create User</ButtonBase>
    </div>
  </div>
</template>
