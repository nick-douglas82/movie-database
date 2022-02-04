<template>
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full py-10">
    <MediaListing :media="trendingMovies">
      <h2 class="uppercase tracking-wider text-orange-500 text-lg font-semibold mt-12">Today's Trending Movies</h2>
    </MediaListing>
    <MediaListing :media="trendingTv">
      <h2 class="uppercase tracking-wider text-orange-500 text-lg font-semibold mt-12">Today's Trending TV</h2>
    </MediaListing>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import MediaListing from '@/components/MediaListing.vue'
import type { Media } from '@/types/media'

export default defineComponent({
  components: {
    MediaListing,
  },
  setup() {
    const state = reactive({
      trendingMovies: [] as Media[],
      trendingTv: [] as Media[],
    })

    fetch(`${import.meta.env.VITE_TMDB_URL}trending/all/day?api_key=${import.meta.env.VITE_TMDB_API_KEY}`)
      .then(res => res.json())
      .then(data => {
        state.trendingMovies = data.results.filter((movie: { media_type: string }) => movie.media_type === 'movie')
        state.trendingTv = data.results.filter((tv: { media_type: string }) => tv.media_type === 'tv')
      })

    return {
      ...toRefs(state),
    }
  },
})
</script>
