<template>
  <div class="actor-info relative bg-center">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full flex flex-col md:flex-row relative z-10 mb-16">
      <div class="flex-none">
        <img :src="`https://image.tmdb.org/t/p/w300/${actor.profile_path}`" alt="profile image" class="w-76" />
      </div>
      <div class="md:ml-24">
        <h2 class="text-4xl mt-4 md:mt-0 font-semibold">{{ actor.name }}</h2>
        <div class="flex flex-wrap items-center text-gray-400 text-sm">
          <CakeIcon class="w-4" />
          <span class="ml-2"
            >{{ formatDate(actor.birthday || '') }} ({{ calculateAge(actor.birthday || '') }} years old) in
            {{ actor.place_of_birth }}</span
          >
        </div>

        <p class="text-gray-500 mt-8">{{ actor.biography }}</p>

        <h4 class="font-semibold mt-12">Known For</h4>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          <div v-for="(actorCredit, index) in credits" class="mt-4">
            <router-link :to="`/${actorCredit.type}/${actorCredit.tmdbId}`">
              <img
                :src="
                  actorCredit.poster
                    ? `https://image.tmdb.org/t/p/w185/${actorCredit.poster}`
                    : `https://placehold.co/185x274`
                "
                alt="poster"
                class="hover:opacity-75 transition ease-in-out duration-150"
            /></router-link>
            <router-link
              :to="`/${actorCredit.type}/${actorCredit.tmdbId}`"
              class="text-sm text-gray-700 leading-none mt-2 hover:text-gray:300"
            >
              {{ actorCredit.title }}</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import type { Person } from 'moviedb-promise/dist/request-types'
import { fetchActor, fetchActorCombinedCredits } from '@/services/DataService'
import { calculateAge, formatDate } from '@/lib/date'
import { formatCredits, CombinedListItem } from '@/lib/format'
import { CakeIcon } from '@heroicons/vue/solid'

export default defineComponent({
  components: {
    CakeIcon,
  },
  async setup() {
    const state = reactive({
      actor: {} as Person,
      credits: [] as CombinedListItem[],
    })

    const route = useRoute()
    if (route.params.id && typeof route.params.id === 'string') {
      state.actor = await fetchActor(route.params.id)

      const credits = await fetchActorCombinedCredits(route.params.id)
      state.credits = formatCredits(credits).slice(0, 5)
    }

    return {
      ...toRefs(state),
      formatDate,
      calculateAge,
      CakeIcon,
    }
  },
})
</script>
