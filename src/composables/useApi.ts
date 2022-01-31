import { toRefs, reactive, watch } from 'vue'

interface State {
  response: []
  error: []
  fetching: boolean
}

export default function (url: string, options = {}) {
  const state: State = reactive({
    response: [],
    error: [],
    fetching: true,
  })

  const fetchData = async () => {
    try {
      const res = await fetch(url, options)
      const json = await res.json()
      state.response = json.results
    } catch (errors) {
      // state.error = errors;
    } finally {
      state.fetching = false
    }
  }

  return { ...toRefs(state), fetchData }
}
