<script setup lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import MediaListing from '@/components/MediaListing.vue'
import { MediaItem } from '@/lib/format'
import { fetchAllTrending } from '@/services/DataService'

const state = reactive({
  trendingMovies: [] as MediaItem[],
  trendingTv: [] as MediaItem[],
})

const allTrending = await fetchAllTrending()
state.trendingMovies = allTrending.filter(trendingItem => trendingItem.media_type === 'movie')
state.trendingTv = allTrending.filter(trendingItem => trendingItem.media_type === 'tv')
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full py-10">
    <MediaListing :media="state.trendingMovies">Today's Trending Movies</MediaListing>
    <MediaListing :media="state.trendingTv">Today's Trending TV</MediaListing>
  </div>
</template>
