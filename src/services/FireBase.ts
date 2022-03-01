import { createUserWithEmailAndPassword, getAuth, updateProfile, signInWithEmailAndPassword } from 'firebase/auth'
import 'firebase/auth'
import 'firebase/firestore'

export type SignInParams = {
  email: string
  password: string
}

export const signIn = (email, password) => {
  const auth = getAuth()
  return signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => true)
    .catch(error => false)
}

export const register = (email, password, displayName) => {
  const auth = getAuth()
  return createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      updateProfile(auth.currentUser, {
        displayName: displayName,
      }).then(() => {
        return userCredential.user
      })
    })
    .catch(error => false)
}
