<script setup lang="ts">
import { ref, Ref } from 'vue'
import { useRouter } from 'vue-router'
import { createNewUser } from '@/lib/api/user'
import ButtonBase from '@/components/ButtonBase.vue'

const router = useRouter()

const name: Ref<string> = ref("");
const email: Ref<string> = ref("");
const password: Ref<string> = ref("");

const submitForm = () => createNewUser(email.value, name.value, password.value);
</script>

<template>
  <div class="flex flex-col items-center justify-center h-full">
    <div class="max-w-md -mt-24">
      <h2 class="mb-4 text-2xl font-light text-center text-white">Create a user account</h2>
      <input
        type="text"
        class="w-full px-2 mb-3 text-gray-600 rounded-sm h-9"
        v-model="name"
        placeholder="Name"
        required
      />
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
      <ButtonBase class="text-white" @click="submitForm()">Create User</ButtonBase>
    </div>
  </div>
</template>
