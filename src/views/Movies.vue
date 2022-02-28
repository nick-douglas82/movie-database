<script setup lang="ts">
import { reactive } from 'vue'
import MediaListing from '@/components/MediaListing.vue'
import { fetchNowPlaying, fetchPopularMovies } from '@/services/DataService'
import { formatMediaItems, MediaItem } from '@/lib/format'

const state = reactive({
  popular: [] as MediaItem[],
  nowPlaying: [] as MediaItem[],
})

const popularMovies = await fetchPopularMovies()
state.popular = formatMediaItems(popularMovies, 'movie')

const nowPlaying = await fetchNowPlaying()
state.nowPlaying = formatMediaItems(nowPlaying, 'movie')
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full py-10">
    <MediaListing :media="state.popular">Current Popular Movies</MediaListing>
    <MediaListing :media="state.nowPlaying">Now Playing</MediaListing>
  </div>
</template>
