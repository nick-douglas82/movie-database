import { User } from '@/lib/api/types'
import { Media } from '@/types/media'
import { defineStore, createPinia } from 'pinia'

const pinia = createPinia()

export default pinia

export type UserRootState = {
  isAuthenticated: boolean
  email: string
  name: string
  id: string | null
}

export const useUserStore = defineStore({
  id: 'userStore',
  state: () =>
    ({
      isAuthenticated: false,
      id: null,
      name: '',
      email: '',
    } as UserRootState),

  actions: {
    logUserIn(user: User) {
      this.setAuthStatus(true)
      this.setUser(user)
    },
    logUserOut() {
      this.isAuthenticated = false
      this.setUser({ id: null, name: '', email: '' })
    },
    setAuthStatus(authStatus: boolean) {
      this.isAuthenticated = authStatus
    },
    setUser(user: User) {
      this.id = user.id
      this.name = user.name
      this.email = user.email
    },
  },
  getters: {
    isLoggedIn: state => state.isAuthenticated,
    getUser: state => {
      return {
        id: state.id,
        name: state.name,
        email: state.email,
      }
    },
  },
})

export type ErrorRootState = {
  errors: Array<string>
}

export const useErrorStore = defineStore({
  id: 'errorStore',
  state: () =>
    ({
      errors: [],
    } as ErrorRootState),
  actions: {
    addError(error: string) {
      this.errors.push(error)
    },
    clearErrors() {
      this.errors = []
    },
  },
  getters: {
    getErrors: state => state.errors,
    hasErrors: state => state.errors.length > 0,
  },
})

export type TransactionRootState = {
  isLoading: boolean
}

export const useTransactionStore = defineStore({
  id: 'transactionStore',
  state: () =>
    ({
      isLoading: false,
    } as TransactionRootState),
  actions: {
    setIsLoading(isLoading: boolean) {
      this.isLoading = isLoading
    },
    resetIsLoading() {
      this.isLoading = false
    },
  },
  getters: {
    getIsloading: state => state.isLoading,
  },
})

export const useMovieStore = defineStore({
  id: 'movieStore',
  state: () => ({
    movies: [],
  }),
})

export interface List {
  id: number
  title: string
  userId: string
  media: [Media]
}

export const useListsStore = defineStore({
  id: 'listsStore',
  state: () => ({
    lists: [] as List[],
  }),
})
