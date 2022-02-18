<template>
  <slot />
  <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
    <li v-for="mediaItem in media">
      <div class="mt-2">
        <router-link :to="`/${mediaItem.type}/${mediaItem.id}`" class="text-lg mt-2 hover:text-gray-300">
          <img :src="`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${mediaItem.poster_path}`" alt="" />
        </router-link>
        <div class="mt-2">
          <router-link :to="`/${mediaItem.type}/${mediaItem.id}`" class="text-lg mt-2 hover:text-gray-300">
            <p class="pointer-events-none mt-2 block truncate font-medium text-base">
              {{ mediaItem.title || mediaItem.name }}
            </p>
          </router-link>
          <div class="flex movies-center text-gray-400 text-sm mt-1">
            <template v-if="mediaItem.vote_average && mediaItem.vote_average > 0">
              <AverageRating :rating="mediaItem.vote_average" />
              <span class="mx-2">|</span>
            </template>
            <span>{{
              formatDateToYear(mediaItem.release_date || '') || formatDateToYear(mediaItem.first_air_date || '')
            }}</span>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import AverageRating from '@/components/AverageRating.vue'
import { formatDateToYear } from '@/lib/date'
import { StarIcon } from '@heroicons/vue/solid'
import { MediaItem } from '@/lib/format'

export default defineComponent({
  component: {
    StarIcon,
    AverageRating,
  },
  props: {
    media: {
      type: Object as PropType<MediaItem[]>,
      default: null,
    },
  },
  setup() {
    return {
      AverageRating,
      formatDateToYear,
    }
  },
  components: { AverageRating },
})
</script>
