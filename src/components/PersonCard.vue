<script setup lang="ts">
import { Person } from '@/services/DataService'
import { defineComponent, PropType } from 'vue'

const props = defineProps<{
  person: Person
}>()
</script>

<template>
  <div class="mt-4">
    <router-link :to="`/actors/${person.id}`">
      <img
        :src="
          person.profile_path
            ? `https://image.tmdb.org/t/p/w185/${person.profile_path}`
            : `https://placehold.co/185x274`
        "
        :alt="`Picture of actor: ${person.name}`"
        class="overflow-hidden transition duration-150 ease-in-out rounded-sm hover:opacity-75"
      />
    </router-link>
    <div class="mt-2">
      <router-link :to="`/actors/${person.id}`" class="mt-2 text-xs font-semibold text-gray-400 hover:text-gray:300">{{
        person.name
      }}</router-link>
      <div class="text-sm text-white">{{ person.character }}</div>
    </div>
  </div>
</template>
