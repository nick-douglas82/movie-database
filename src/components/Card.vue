<script setup lang="ts">
import { formatDateToYear } from '@/lib/date'
import type { Media } from '@/types/media'
import AverageRating from '@/components/AverageRating.vue'

const props = defineProps<{
  value: Media
}>()
</script>

<template>
  <div class="mt-2">
    <router-link :to="`/${value.media_type}/${value.id}`" class="mt-2 text-lg hover:text-gray-300">
      <img :src="`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${value.poster_path}`" alt="" />
    </router-link>
    <div class="mt-2">
      <router-link :to="`/${value.media_type}/${value.id}`" class="mt-2 text-lg hover:text-gray-300">
        <p class="block mt-2 text-base font-medium truncate pointer-events-none">
          {{ value.title || value.name }}
        </p>
      </router-link>
      <div class="flex mt-1 text-sm text-gray-400 movies-center">
        <template v-if="value.vote_average > 0">
          <AverageRating :rating="value.vote_average.toFixed(1)" />
          <span class="mx-2">|</span>
        </template>
        <span>{{ formatDateToYear(value.release_date) || formatDateToYear(value.first_air_date) }}</span>
      </div>
    </div>
  </div>
</template>
