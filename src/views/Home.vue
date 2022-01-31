<template>
  <div class="home">HOME!</div>
  <ul>
    <li v-for="movie in trendingMovies">{{ movie.title }} - {{ movie.media_type }}</li>
  </ul>
  ______________
  <ul>
    <li v-for="movie in trendingTv">{{ movie.name }} - {{ movie.media_type }}</li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed } from 'vue'
import useApi from '../composables/useApi'

interface Trending {
  value: Array<any>
}
export default defineComponent({
  setup() {
    let trending = reactive<Trending>({})
    const { response, error, fetching, fetchData } = useApi(
      'https://api.themoviedb.org/3/trending/all/day?api_key=e0c577647a14eae09f07aa14fee7caeb'
    )
    fetchData()
    trending = ref(response)

    console.log(trending)

    const trendingMovies = computed(() => trending.value.filter(movie => movie.media_type === 'movie'))
    const trendingTv = computed(() => trending.value.filter(tv => tv.media_type === 'tv'))

    return {
      trendingMovies,
      trendingTv,
    }
  },
})
</script>
