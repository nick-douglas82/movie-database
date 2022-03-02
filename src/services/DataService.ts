import { MediaItem } from '@/lib/format'
import type {
  Person as PersonResponse,
  PersonCombinedCreditsResponse,
  PopularMoviesResponse,
} from 'moviedb-promise/dist/request-types'

export interface Movie {
  id: number
  title: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  vote_average: number
  overview: string
  tagline: string
  runtime: number
  genres: Array<{
    id: number
    name: string
  }>
}
export interface TV {
  id: number
  name: string
  poster_path: string | null
  backdrop_path: string | null
  first_air_date: string
  vote_average: number
  overview: string
  tagline: string
  episode_run_time: number[]
  genres: Array<{
    id: number
    name: string
  }>
}

export interface Credits {
  cast: Array<Person>
  crew: Array<Crew>
}

export interface Person {
  id: number
  adult: boolean
  cast_id: number
  character: string
  name: string
  order: 0
  original_name: string
  profile_path: string
}

export interface Crew extends Person {
  job: string
}

export interface CombinedCredits extends Movie, TV {}

export const fetchAllTrending = async (): Promise<MediaItem[]> => {
  const response = await window.fetch(
    `${import.meta.env.VITE_TMDB_URL}trending/all/day?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
  )
  const json = await response.json()
  return json.results
}

export const fetchMovie = async (id: string): Promise<Movie> => {
  const response = await window.fetch(
    `${import.meta.env.VITE_TMDB_URL}movie/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
  )
  return await response.json()
}

export const fetchTv = async (id: string): Promise<TV> => {
  const response = await window.fetch(
    `${import.meta.env.VITE_TMDB_URL}tv/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
  )
  return await response.json()
}

export const fetchCredits = async (id: string, type: string): Promise<Credits> => {
  const response = await window.fetch(
    `${import.meta.env.VITE_TMDB_URL}${type}/${id}/credits?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
  )
  return await response.json()
}

export const fetchActor = async (id: string): Promise<PersonResponse> => {
  const response = await window.fetch(
    `${import.meta.env.VITE_TMDB_URL}person/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
  )
  return await response.json()
}

export const fetchActorCombinedCredits = async (id: string): Promise<PersonCombinedCreditsResponse> => {
  const response = await window.fetch(
    `${import.meta.env.VITE_TMDB_URL}person/${id}/combined_credits?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
  )
  return await response.json()
}

export const fetchPopularMovies = async (): Promise<MediaItem[]> => {
  const response = await window.fetch(
    `${import.meta.env.VITE_TMDB_URL}movie/popular?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
  )
  const json = await response.json()
  return json.results
}

export const fetchNowPlaying = async (): Promise<MediaItem[]> => {
  const response = await window.fetch(
    `${import.meta.env.VITE_TMDB_URL}movie/now_playing?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
  )
  const json = await response.json()
  return json.results
}

export const fetchPopularTv = async (): Promise<MediaItem[]> => {
  let fetchData = {
    method: 'POST',
    body: JSON.stringify('NICK TEST'),
    headers: new Headers({
      'Content-Type': 'application/json; charset=UTF-8',
    }),
  }
  const response = await window.fetch(
    `${import.meta.env.VITE_TMDB_URL}tv/popular?api_key=${import.meta.env.VITE_TMDB_API_KEY}`,
    fetchData
  )
  const json = await response.json()
  return json.results
}

export const fetchTopRatedTv = async (): Promise<MediaItem[]> => {
  const response = await window.fetch(
    `${import.meta.env.VITE_TMDB_URL}tv/top_rated?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
  )
  const json = await response.json()
  return json.results
}

export const fetchUserLists = async (): Promise<MediaItem[]> => {
  console.log('here')
  const response = await window.fetch(`http://localhost:8080/api/lists`)
  const json = await response.json()
  return json.results
}
