import { defineStore } from 'pinia'

export interface User {
  displayName: string
}

export const useUserStore = defineStore({
  id: 'userStore',
  state: () => ({
    isLoggedIn: <boolean>false,
    user: <User>{},
  }),
})
