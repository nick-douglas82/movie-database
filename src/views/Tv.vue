<template>
  <div
    class="tv-info relative bg-center"
    :style="{
      backgroundImage: `url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${tv.backdrop_path})`,
    }"
  >
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full flex flex-col md:flex-row relative z-10">
      <div class="mt-auto">
        <div class="p-6 mt-64 backdrop-blur-md bg-black/20 w-2/3">
          <h2 class="text-4xl mt-4 md:mt-0 font-semibold text-white">{{ tv.name }}</h2>
          <div class="flex flex-wrap items-center text-sm text-white">
            <AverageRating :rating="tv.vote_average" />
            <span class="mx-2">|</span>
            <span>{{ formatDateToYear(tv.first_air_date) }}</span>
            <span class="mx-2">|</span>
            <span>Average run time: {{ convertMinsToHrsMins(averageRunTime(tv.episode_run_time)) }}</span>
            <div class="mt-4">
              <GenresList :genres="tv.genres" />
              <h3 v-if="tv.tagline" class="font-semibold text-lg text-white mt-2">{{ tv.tagline }}</h3>
              <p class="text-white">{{ tv.overview }}</p>
            </div>
            <div class="mt-6">
              <h4 class="text-lg font-bold">Featured Crew</h4>
              <div class="flex mt-2">
                <div class="mr-8" v-for="(crew, index) in credits.crew">
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

  <div class="mx-auto max-w-7xl sm:px-6 lg:px-8 w-full px-4 py-16" v-if="credits.cast.length > 0">
    <h2 class="text-4xl font-semibold">Cast</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
      <PersonCard v-for="(cast, index) in credits.cast" :person="cast" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import { fetchTv, fetchCredits, TV, Credits } from '@/services/DataService'
import { formatDateToYear } from '@/lib/date'
import { convertMinsToHrsMins, averageRunTime } from '@/lib/time'
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

    return {
      ...toRefs(state),
      formatDateToYear,
      convertMinsToHrsMins,
      averageRunTime,
    }
  },
})
</script>
