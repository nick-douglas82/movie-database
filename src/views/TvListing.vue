<template>
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full py-10">
    <MediaListing :media="popular">
      <h2 class="uppercase tracking-wider text-orange-500 text-lg font-semibold mt-12">Current Popular TV</h2>
    </MediaListing>
    <MediaListing :media="topRated">
      <h2 class="uppercase tracking-wider text-orange-500 text-lg font-semibold mt-12">Top Rated TV Shows</h2>
    </MediaListing>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import MediaListing from '@/components/MediaListing.vue'
import { fetchPopularTv, fetchTopRatedTv } from '@/services/DataService'
import { formatMediaItems, MediaItem } from '@/lib/format'

export default defineComponent({
  components: {
    MediaListing,
  },
  async setup() {
    const state = reactive({
      popular: [] as MediaItem[],
      topRated: [] as MediaItem[],
    })

    const popularTv = await fetchPopularTv()
    state.popular = formatMediaItems(popularTv, 'tv')

    const topRated = await fetchTopRatedTv()
    state.topRated = formatMediaItems(topRated, 'tv')

    return {
      ...toRefs(state),
      MediaListing,
    }
  },
})
</script>
