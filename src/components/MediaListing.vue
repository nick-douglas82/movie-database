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
  <h2 class="text-gray-500 tracking-wider text-lg mt-12 mb-4 flex items-center content-center">
    <slot />
    <span class="w-full h-0 border border-gray-500 flex-1 ml-6"></span>
  </h2>
  <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
    <li class="relative" v-for="mediaItem in media">
      <div class="mt-2">
        <AddToList :mediaId="mediaItem.id" />

        <router-link
          :to="`/${mediaItem.media_type}/${mediaItem.id}`"
          class="text-lg mt-2 hover:text-gray-300 relative block rounded-md overflow-hidden"
        >
          <img
            :src="`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${mediaItem.poster_path}`"
            alt=""
            class="hover:opacity-75 transition ease-in-out duration-150 block"
          />
          <template v-if="mediaItem.vote_average && mediaItem.vote_average > 0">
            <AverageRating class="absolute top-1 right-1" :rating="mediaItem.vote_average" />
          </template>
        </router-link>
        <div class="mt-2">
          <div class="flex movies-center text-gray-400 text-xs mt-1">
            <span>{{
              formatDateToYear(mediaItem.release_date || '') || formatDateToYear(mediaItem.first_air_date || '')
            }}</span>
          </div>
          <router-link :to="`/${mediaItem.media_type}/${mediaItem.id}`" class="text-white">
            <p class="pointer-events-none block truncate font-light text-base">
              {{ mediaItem.title || mediaItem.name }}
            </p>
          </router-link>
        </div>
      </div>
    </li>
  </ul>
</template>
