<template>
  <div class="movie-info border-b border-gray-800">
    <div class="container mx-auto px-4 py-16 flex flex-col md:flex-row">
      <div class="flex-none">
        <img :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`" alt="poster" class="w-64 lg:w-96" />
      </div>
      <div class="md:ml-24">
        <h2 class="text-4xl mt-4 md:mt-0 font-semibold">{{ movie.title }}</h2>
        <div class="flex flex-wrap items-center text-gray-400 text-sm">
          <StarIcon class="fill-current text-orange-500 w-4" />
          <span class="ml-1">{{ movie.vote_average }}</span>
          <span class="mx-2">|</span>
          <span>{{ formatDate(movie.release_date) }}</span>
          <span class="mx-2">|</span>
          <span>
            <template v-for="(genre, index) in movie.genres">
              {{ genre.name }}<template v-if="index !== Object.keys(movie.genres).length - 1">, </template>
            </template>
          </span>
          <div class="mt-8">
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

  <div class="container mx-auto px-4 py-16">
    <h2 class="text-4xl font-semibold">Cast</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
      <div class="mt-8" v-for="(cast, index) in credits.cast">
        <a :href="`/actors/${cast.id}`">
          <img
            :src="`https://image.tmdb.org/t/p/w300/${cast.profile_path}`"
            alt="actor1"
            class="hover:opacity-75 transition ease-in-out duration-150"
          />
        </a>
        <div class="mt-2">
          <a href="`/actors/${cast.id}`" class="text-lg mt-2 hover:text-gray:300">{{ cast.name }}</a>
          <div class="text-sm text-gray-400">{{ cast.character }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import { fetchMovie, fetchCredits } from '@/services/DataService'
import { formatDate } from '@/lib/date'
import { Movie, Credits } from '@/services/DataService'
import { StarIcon } from '@heroicons/vue/solid'

export default defineComponent({
  components: {
    StarIcon,
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
      formatDate,
    }
  },
})
</script>
