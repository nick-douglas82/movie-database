<template>
  <p class="text-sm mb-4">You must be signed in to add to or create a list.</p>
  <input type="text" class="px-2 rounded-sm h-7 w-full mb-3 text-gray-600" v-model="email" placeholder="Email" />
  <input type="password" class="px-2 rounded-sm h-7 w-full text-gray-600" v-model="password" placeholder="Password" />
  <ButtonBase @click="signIntoApp()">Sign in</ButtonBase>
  <p class="font-bold my-1">or</p>
  <router-link :to="`/register`" class="text-sm underline">Create an account</router-link>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { signIn } from '@/services/FireBase'
import ButtonBase from '@/components/ButtonBase.vue'

export default defineComponent({
  components: {
    ButtonBase,
  },

  setup(props, context) {
    const email = ref('')
    const password = ref('')

    const signIntoApp = async () => await signIn(email.value, password.value)

    return {
      ButtonBase,
      email,
      password,
      signIntoApp,
    }
  },
})
</script>
