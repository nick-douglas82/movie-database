<template>
  <div class="movie-info border-b border-gray-800">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full py-16 flex flex-col md:flex-row">
      <div class="flex-none">
        <img :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`" alt="poster" class="w-64 lg:w-96" />
      </div>
      <div class="md:ml-24">
        <h2 class="text-4xl mt-4 md:mt-0 font-semibold">{{ movie.title }}</h2>
        <div class="flex flex-wrap items-center text-gray-400 text-sm">
          <AverageRating :rating="movie.vote_average" />
          <span class="mx-2">|</span>
          <span>{{ formatDateToYear(movie.release_date) }}</span>
          <span class="mx-2">|</span>
          <span>{{ convertMinsToHrsMins(movie.runtime) }}</span>
          <div class="mt-8">
            <GenresList :genres="movie.genres" />
            <h3 class="font-semibold text-lg text-gray-500">{{ movie.tagline }}</h3>
            <p class="text-gray-400">{{ movie.overview }}</p>
          </div>
          <div class="mt-12">
            <h4 class="text-lg font-bold">Featured Crew</h4>
            <div class="flex mt-2">
              <div class="mr-8" v-for="(crew, index) in credits.crew">
                <div class="text-sm text-gray-400 font-semibold">{{ crew.job }}</div>
                <div>{{ crew.name }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="mx-auto max-w-7xl sm:px-6 lg:px-8 w-full px-4 py-16">
    <h2 class="text-4xl font-semibold">Cast</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
      <PersonCard v-for="(cast, index) in credits.cast" :person="cast" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import { fetchMovie, fetchCredits } from '@/services/DataService'
import { formatDateToYear } from '@/lib/date'
import { convertMinsToHrsMins } from '@/lib/time'
import { Movie, Credits } from '@/services/DataService'
import GenresList from '@/components/GenreList.vue'
import AverageRating from '@/components/AverageRating.vue'
import PersonCard from '@/components/PersonCard.vue'

export default defineComponent({
  components: {
    GenresList,
    AverageRating,
    PersonCard,
  },
  async setup() {
    const state = reactive({
      movie: {} as Movie,
      credits: {} as Credits,
    })

    const route = useRoute()
    if (route.params.id && typeof route.params.id === 'string') {
      state.movie = await fetchMovie(route.params.id)
      const credits = await fetchCredits(route.params.id)
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

    return {
      ...toRefs(state),
      formatDateToYear,
      convertMinsToHrsMins,
    }
  },
})
</script>
