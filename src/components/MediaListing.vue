<script setup lang="ts">
import { MediaItem } from '@/lib/format'
import { formatDateToYear } from '@/lib/date'
import AverageRating from '@/components/AverageRating.vue'
import AddToList from '@/components/AddToList.vue'

const props = defineProps<{
  media: MediaItem[]
}>()
</script>

<template>
  <h2 class="flex items-center content-center mt-12 mb-4 text-lg tracking-wider text-gray-500">
    <slot />
    <span class="flex-1 w-full h-0 ml-6 border border-gray-500"></span>
  </h2>
  <ul class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
    <li class="relative" v-for="mediaItem in media">
      <div class="mt-2">
        <AddToList :mediaItem="mediaItem" />

        <router-link
          :to="`/${mediaItem.media_type}/${mediaItem.id}`"
          class="relative block mt-2 overflow-hidden text-lg rounded-md hover:text-gray-300"
        >
          <img
            :src="`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${mediaItem.poster_path}`"
            alt=""
            class="block transition duration-150 ease-in-out hover:opacity-75"
          />
          <template v-if="mediaItem.vote_average && mediaItem.vote_average > 0">
            <AverageRating class="absolute top-1 right-1" :rating="mediaItem.vote_average.toFixed(1)" />
          </template>
        </router-link>
        <div class="mt-2">
          <div class="flex mt-1 text-xs text-gray-400 movies-center">
            <span>{{
              formatDateToYear(mediaItem.release_date || '') || formatDateToYear(mediaItem.first_air_date || '')
            }}</span>
          </div>
          <router-link :to="`/${mediaItem.media_type}/${mediaItem.id}`" class="text-white">
            <p class="block text-base font-light truncate pointer-events-none">
              {{ mediaItem.title || mediaItem.name }}
            </p>
          </router-link>
        </div>
      </div>
    </li>
  </ul>
</template>
