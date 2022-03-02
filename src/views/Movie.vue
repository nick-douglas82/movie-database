<script setup lang="ts">
import { reactive } from 'vue'
import { useRoute } from 'vue-router'
import { fetchMovie, fetchCredits } from '@/services/DataService'
import { formatDateToYear } from '@/lib/date'
import { convertMinsToHrsMins } from '@/lib/time'
import { Movie, Credits } from '@/services/DataService'
import GenresList from '@/components/GenreList.vue'
import AverageRating from '@/components/AverageRating.vue'
import PersonCard from '@/components/PersonCard.vue'
import { useMovieStore } from '@/store'
import { startAfter } from 'firebase/firestore'

const movieStore = useMovieStore()

const state = reactive({
  movie: {} as Movie,
  credits: {} as Credits,
})

const route = useRoute()
if (route.params.id && typeof route.params.id === 'string') {
  state.movie = movieStore.movies[route.params.id as any]
    ? movieStore.movies[route.params.id as any]
    : await fetchMovie(route.params.id)

  const credits = await fetchCredits(route.params.id, 'movie')
  const filteredCrew = credits.crew
    .filter(crewMember =>
      ['Director', 'Producer', 'Costume Design', 'Original Music Composer'].some(job => crewMember.job === job)
    )
    .slice(0, 4)

  state.credits = {
    cast: credits.cast.slice(0, 6),
    crew: filteredCrew,
  }

  movieStore.movies[route.params.id] = state.movie
}
</script>

<template>
  <div
    class="movie-info relative bg-center"
    :style="{
      backgroundImage: `url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${state.movie.backdrop_path})`,
    }"
  >
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full flex flex-col md:flex-row relative z-10">
      <div class="mt-auto">
        <div class="p-6 mt-64 backdrop-blur-md bg-black/20 w-2/3">
          <h2 class="text-4xl mt-4 md:mt-0 font-semibold text-white">{{ state.movie.title }}</h2>
          <div class="flex flex-wrap items-center text-white text-sm mt-2">
            <AverageRating :rating="state.movie.vote_average" />
            <span class="mx-2">|</span>
            <span>{{ formatDateToYear(state.movie.release_date) }}</span>
            <span class="mx-2">|</span>
            <span>{{ convertMinsToHrsMins(state.movie.runtime) }}</span>
            <div class="mt-8">
              <GenresList :genres="state.movie.genres" />
              <h3 v-if="state.movie.tagline" class="font-semibold text-lg text-white">{{ state.movie.tagline }}</h3>
              <p class="text-white">{{ state.movie.overview }}</p>
            </div>
            <div class="mt-12">
              <h4 class="text-lg font-bold">Featured Crew</h4>
              <div class="flex mt-2">
                <div class="mr-8" v-for="(crew, index) in state.credits.crew">
                  <div class="text-sm text-white font-semibold">{{ crew.job }}</div>
                  <div>{{ crew.name }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="mx-auto max-w-7xl sm:px-6 lg:px-8 w-full px-4 py-16">
    <h2 class="text-4xl font-base text-white">Cast</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
      <PersonCard v-for="(cast, index) in state.credits.cast" :person="cast" />
    </div>
  </div>
</template>
