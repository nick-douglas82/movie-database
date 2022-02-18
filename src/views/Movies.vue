<template>
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full py-10">
    <MediaListing :media="popular">Current Popular Movies</MediaListing>
    <MediaListing :media="nowPlaying">Now Playing</MediaListing>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import MediaListing from '@/components/MediaListing.vue'
import { fetchNowPlaying, fetchPopularMovies } from '@/services/DataService'
import { formatMediaItems, MediaItem } from '@/lib/format'

export default defineComponent({
  components: {
    MediaListing,
  },
  async setup() {
    const state = reactive({
      popular: [] as MediaItem[],
      nowPlaying: [] as MediaItem[],
    })

    const popularMovies = await fetchPopularMovies()
    state.popular = formatMediaItems(popularMovies, 'movie')

    const nowPlaying = await fetchNowPlaying()
    state.nowPlaying = formatMediaItems(nowPlaying, 'movie')

    return {
      ...toRefs(state),
      MediaListing,
    }
  },
})
</script>
