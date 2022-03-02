import { createApp } from 'vue'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { createPinia } from 'pinia'
import router from './router/index.js'
import App from './App.vue'
import './index.css'

const firebaseConfig = {
  apiKey: 'AIzaSyDQQs7uX64kjyjnKvcsOjcOz6LPQtanrKc',
  authDomain: 'movie-database-6ec9c.firebaseapp.com',
  projectId: 'movie-database-6ec9c',
  storageBucket: 'movie-database-6ec9c.appspot.com',
  messagingSenderId: '685743282444',
  appId: '1:685743282444:web:f19ff7476cd1423660d129',
}

initializeApp(firebaseConfig)
export const db = getFirestore()

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.mount('#app')
