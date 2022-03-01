<script setup lang="ts">
import { ref } from 'vue'
import 'firebase/auth'
import 'firebase/firestore'
import { useRouter } from 'vue-router'
import ButtonBase from '@/components/ButtonBase.vue'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

const router = useRouter()

const email = ref('')
const password = ref('')
const errMsg = ref()

const signIn = async () => {
  const auth = getAuth()
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(data => router.push('/'))
    .catch(error => {
      switch (error.code) {
        case 'auth/invalid-email':
          errMsg.value = 'Invalid email'
          break
        case 'auth/user-not-found':
          errMsg.value = 'No account with that email was found'
          break
        case 'auth/wrong-password':
          errMsg.value = 'Incorrect password'
          break
        default:
          errMsg.value = 'Email or password was incorrect'
          break
      }
    })
}
</script>

<template>
  <div class="flex flex-col h-full justify-center items-center">
    <div class="max-w-md -mt-24">
      <h2 class="text-white text-2xl mb-4 text-center font-light">Login</h2>
      <div
        class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-2"
        role="alert"
        v-if="errMsg"
      >
        {{ errMsg }}
      </div>
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
      <ButtonBase class="text-white" @click="signIn()">Login</ButtonBase>
    </div>
  </div>
</template>
