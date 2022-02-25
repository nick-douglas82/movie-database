import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import 'firebase/auth'
import 'firebase/firestore'
import { useUserStore } from '@/store/index.js'

export type SignInParams = {
  email: string
  password: string
}

export const signIn = (email, password) => {
  const auth = getAuth()
  return signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      // Set the user in there store?!
      const mainStore = useUserStore()
      const user = userCredential.user
      mainStore.isLoggedIn = true
      return true
    })
    .catch(error => false)
}
