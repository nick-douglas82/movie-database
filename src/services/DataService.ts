export interface Movie {
  id: number
  title: string
  poster_path: string | null
  release_date: string
  vote_average: number
  overview: string
  tagline: string
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

// export interface Crew {
//   'Costume Design': Test[]
//   Director: Test[]
//   'Original Music Composer': Test[]
//   Producer: Test[]
// }

export const fetchMovie = async (id: string): Promise<Movie> => {
  const response = await window.fetch(
    `${import.meta.env.VITE_TMDB_URL}movie/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
  )
  return await response.json()
}

export const fetchCredits = async (id: string): Promise<Credits> => {
  const response = await window.fetch(
    `${import.meta.env.VITE_TMDB_URL}movie/${id}/credits?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
  )
  return await response.json()
}
