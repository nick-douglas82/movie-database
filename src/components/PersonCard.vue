<template>
  <div class="mt-4">
    <a :href="`/actors/${person.id}`">
      <img
        :src="`https://image.tmdb.org/t/p/w300/${person.profile_path}`"
        :alt="`Picture of actor: ${person.name}`"
        class="hover:opacity-75 transition ease-in-out duration-150 rounded-sm overflow-hidden"
      />
    </a>
    <div class="mt-2">
      <a :href="`/actor/${person.id}`" class="text-gray-400 text-xs font-semibold mt-2 hover:text-gray:300">{{
        person.name
      }}</a>
      <div class="text-sm text-white">{{ person.character }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Person } from '@/services/DataService'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    person: {
      type: Object as PropType<Person>,
      default: () => ({}),
    },
  },
})
</script>
