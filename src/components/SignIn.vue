<template>
  <p class="text-sm mb-4">You must be signed in to add to or create a list.</p>
  <input type="text" class="px-2 rounded-sm h-7 w-full mb-3" placeholder="Username" />
  <input type="password" class="px-2 rounded-sm h-7 w-full" placeholder="Password" />
  <ButtonBase>Sign in</ButtonBase>
  <p class="font-bold my-1">or</p>
  <router-link :to="`/register`" class="text-sm underline">Create an account</router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ButtonBase from '@/components/ButtonBase.vue'

export default defineComponent({
  components: {
    ButtonBase,
  },
  setup() {
    return {
      ButtonBase,
    }
  },
})
</script>
