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
