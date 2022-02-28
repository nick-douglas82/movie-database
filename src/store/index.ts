import { defineStore } from 'pinia'

export interface User {}

export const useUserStore = defineStore({
  id: 'userStore',
  state: () => ({
    isLoggedIn: <boolean>false,
    user: <User>{},
  }),
})
