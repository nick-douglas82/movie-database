<template>
  <div class="mt-2">
    <router-link :to="`/${value.media_type}/${value.id}`" class="text-lg mt-2 hover:text-gray-300">
      <img :src="`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${value.poster_path}`" alt="" />
    </router-link>
    <div class="mt-2">
      <router-link :to="`/${value.media_type}/${value.id}`" class="text-lg mt-2 hover:text-gray-300">
        <p class="pointer-events-none mt-2 block truncate font-medium text-base">
          {{ value.title || value.name }}
        </p>
      </router-link>
      <div class="flex movies-center text-gray-400 text-sm mt-1">
        <template v-if="value.vote_average > 0">
          <AverageRating :rating="value.vote_average" />
          <span class="mx-2">|</span>
        </template>
        <span>{{ formatDateToYear(value.release_date) || formatDateToYear(value.first_air_date) }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { formatDateToYear } from '@/lib/date'
import type { Media } from '@/types/media'
import AverageRating from '@/components/AverageRating.vue'
import { StarIcon } from '@heroicons/vue/solid'

export default defineComponent({
  components: {
    AverageRating,
    StarIcon,
  },
  props: {
    value: {
      type: Object as PropType<Media>,
      required: true,
    },
  },
  setup() {
    return {
      formatDateToYear,
    }
  },
})
</script>
