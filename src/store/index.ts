import { defineStore } from 'pinia'

export type User = {
  isLoggedIn: boolean
}

export type RootState = {
  user: User
}

export const useUserStore = defineStore({
  id: 'userStore',
  state: () => ({
    isLoggedIn: <boolean>false,
  }),
})
