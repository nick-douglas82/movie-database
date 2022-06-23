<script setup lang="ts">
import { ref, Ref } from 'vue'
import { CheckCircleIcon } from '@heroicons/vue/solid'
import { createNewUser } from '@/lib/api/user'
import ButtonBase from '@/components/ButtonBase.vue'

const name: Ref<string> = ref("");
const email: Ref<string> = ref("");
const password: Ref<string> = ref("");
const message: Ref<boolean> = ref(false);

const submitForm = () => createNewUser(email.value, name.value, password.value)
  .then(() => {
    name.value = ""
    email.value = ""
    password.value = ""
    message.value = true
  });
</script>

<template>
  <div class="flex flex-col items-center justify-center h-full">
    <div class="max-w-md -mt-24">
      <h2 class="mb-4 text-2xl font-light text-center text-white">Create a user account</h2>
      <div v-if="message" class="px-4 py-3 mb-4 rounded-md bg-green-50">
        <div class="flex">
          <div class="flex-shrink-0">
            <CheckCircleIcon class="w-5 h-5 text-green-400" aria-hidden="true" />
          </div>
          <div class="ml-3">
            <p class="text-sm font-medium text-green-800">User account created.</p>
          </div>
        </div>
      </div>
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
