<script setup lang="ts">
import { reactive } from 'vue'
import { useRoute } from 'vue-router'
import { fetchTv, fetchCredits, TV, Credits } from '@/services/DataService'
import { formatDateToYear } from '@/lib/date'
import { convertMinsToHrsMins, averageRunTime } from '@/lib/time'
import GenresList from '@/components/GenreList.vue'
import AverageRating from '@/components/AverageRating.vue'
import PersonCard from '@/components/PersonCard.vue'

const state = reactive({
  tv: {} as TV,
  credits: {} as Credits,
})

const route = useRoute()
if (route.params.id && typeof route.params.id === 'string') {
  state.tv = await fetchTv(route.params.id)
  const credits = await fetchCredits(route.params.id, 'tv')
  const filteredCrew = credits.crew
    .filter(crewMember =>
      ['Director', 'Producer', 'Costume Design', 'Original Music Composer'].some(job => crewMember.job === job)
    )
    .slice(0, 4)

  state.credits = {
    cast: credits.cast.slice(0, 6),
    crew: filteredCrew,
  }
}
</script>

<template>
  <div
    class="relative bg-center tv-info"
    :style="{
      backgroundImage: `url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${state.tv.backdrop_path})`,
    }"
  >
    <div class="relative z-10 flex flex-col w-full px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 md:flex-row">
      <div class="mt-auto">
        <div class="w-2/3 p-6 mt-64 backdrop-blur-md bg-black/20">
          <h2 class="mt-4 text-4xl font-semibold text-white md:mt-0">{{ state.tv.name }}</h2>
          <div class="flex flex-wrap items-center mt-2 text-sm text-white">
            <AverageRating :rating="state.tv.vote_average.toFixed(1)" />
            <span class="mx-2">|</span>
            <span>{{ formatDateToYear(state.tv.first_air_date) }}</span>
            <span class="mx-2">|</span>
            <span>Average run time: {{ convertMinsToHrsMins(averageRunTime(state.tv.episode_run_time)) }}</span>
            <div class="mt-4">
              <GenresList :genres="state.tv.genres" />
              <h3 v-if="state.tv.tagline" class="mt-2 text-lg font-semibold text-white">{{ state.tv.tagline }}</h3>
              <p class="text-white">{{ state.tv.overview }}</p>
            </div>
            <div class="mt-6">
              <h4 class="text-lg font-bold">Featured Crew</h4>
              <div class="flex mt-2">
                <div class="mr-8" v-for="(crew, index) in state.credits.crew">
                  <div class="text-sm font-semibold">{{ crew.job }}</div>
                  <div>{{ crew.name }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="w-full px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8" v-if="state.credits.cast.length > 0">
    <h2 class="text-4xl font-semibold">Cast</h2>
    <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
      <PersonCard v-for="(cast, index) in state.credits.cast" :person="cast" />
    </div>
  </div>
</template>
