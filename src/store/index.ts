import { ListWithMedia } from './../lib/api/lists'
import { defineStore } from 'pinia'

export interface UserInfo {
  displayName: string | null
  email: string | null
  phoneNumber: string | null
  photoURL: string | null
  providerId: string
  uid: string
}

export const useUserStore = defineStore({
  id: 'userStore',
  state: () => ({
    isLoggedIn: <boolean>false,
    user: <UserInfo>{},
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
