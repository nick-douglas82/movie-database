<script setup lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import MediaListing from '@/components/MediaListing.vue'
import { fetchPopularTv, fetchTopRatedTv } from '@/services/DataService'
import { formatMediaItems, MediaItem } from '@/lib/format'

const state = reactive({
  popular: [] as MediaItem[],
  topRated: [] as MediaItem[],
})

const popularTv = await fetchPopularTv()
state.popular = formatMediaItems(popularTv, 'tv')

const topRated = await fetchTopRatedTv()
state.topRated = formatMediaItems(topRated, 'tv')
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full py-10">
    <MediaListing :media="state.popular">Current Popular TV</MediaListing>
    <MediaListing :media="state.topRated">Top Rated TV Shows</MediaListing>
  </div>
</template>
