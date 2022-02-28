<script setup lang="ts">
import { ref } from 'vue'
import 'firebase/auth'
import 'firebase/firestore'
import { register } from '@/services/FireBase'
import ButtonBase from '@/components/ButtonBase.vue'

const email = ref('')
const password = ref('')
const displayName = ref('')

const createUser = async () => await register(email.value, password.value, 'Nick')
</script>

<template>
  <div class="home">Register!</div>
  <input type="text" class="px-2 rounded-sm h-7 w-full mb-3 text-gray-600" v-model="email" placeholder="Email" />
  <input type="password" class="px-2 rounded-sm h-7 w-full text-gray-600" v-model="password" placeholder="Password" />
  <input type="text" class="px-2 rounded-sm h-7 w-full text-gray-600" v-model="displayName" placeholder="DisplayName" />
  <ButtonBase @click="createUser()">Sign in</ButtonBase>
</template>
