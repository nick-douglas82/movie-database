<script setup lang="ts">
import { Ref, ref } from 'vue'
import { logInUser } from '@/lib/api/user';
import ButtonBase from '@/components/ButtonBase.vue'

const email: Ref<string> = ref('')
const password: Ref<string> = ref('')

const signIntoApp = async () => await logInUser(email.value, password.value)
</script>

<template>
  <p class="mb-4 text-sm">You must be signed in to add to or create a list.</p>
  <input type="text" class="w-full px-2 mb-3 text-gray-600 rounded-sm h-7" v-model="email" placeholder="Email" />
  <input type="password" class="w-full px-2 mb-4 text-gray-600 rounded-sm h-7" v-model="password" placeholder="Password" />
  <ButtonBase @click="signIntoApp()">Sign in</ButtonBase>
  <p class="my-1 font-bold">or</p>
  <router-link :to="`/register`" class="text-sm underline">Create an account</router-link>
</template>
