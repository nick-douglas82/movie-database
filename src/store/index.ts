import { ListWithMedia } from './../lib/api/lists'
import { defineStore } from 'pinia'

export interface User {
  uid: string
  displayName: string
}

export const useUserStore = defineStore({
  id: 'userStore',
  state: () => ({
    isLoggedIn: <boolean>false,
    user: <User>{},
  }),
})

export const useMovieStore = defineStore({
  id: 'movieStore',
  state: () => ({
    movies: [],
  }),
})

export const useListsStore = defineStore({
  id: 'listsStore',
  state: () => ({
    lists: <ListWithMedia[]>[],
  }),
})
