import type {
  MovieResponse,
  MovieResult,
  PersonCombinedCreditsResponse,
  ShowResponse,
  TvResult,
} from 'moviedb-promise/dist/request-types'
import parseISO from 'date-fns/parseISO'
import compareDesc from 'date-fns/compareDesc'
import { formatDate } from './date'

export type CombinedListItem = {
  id?: string
  tmdbId: number
  type: 'movie' | 'tv' | 'person'
  poster?: string
  title: string
  subTitle?: string
}

export const formatMovie = (movie: MovieResult | MovieResponse): CombinedListItem => {
  return {
    tmdbId: movie.id ?? 0,
    type: 'movie',
    poster: movie.poster_path ?? undefined,
    title: movie.title || 'Unknown title',
    subTitle: formatDate(movie.release_date),
  }
}

export const formatTvShow = (tvShow: TvResult | ShowResponse): CombinedListItem => {
  return {
    tmdbId: tvShow.id ?? 0,
    type: 'tv',
    poster: tvShow.poster_path ?? undefined,
    title: tvShow.name || 'Unknown name',
    subTitle: formatDate(tvShow.first_air_date),
  }
}

export const formatCredits = (data: PersonCombinedCreditsResponse): CombinedListItem[] => {
  const { cast } = data

  if (!cast) {
    return []
  }

  const sortedData = cast
    .filter(item => item.release_date || item.first_air_date)
    .sort((a, b) => {
      const aDate = a.release_date
        ? parseISO(a.release_date)
        : a.first_air_date
        ? parseISO(a.first_air_date)
        : new Date()
      const bDate = b.release_date
        ? parseISO(b.release_date)
        : b.first_air_date
        ? parseISO(b.first_air_date)
        : new Date()

      return compareDesc(aDate, bDate)
    })

  return sortedData
    .map((result): CombinedListItem | undefined => {
      if ('media_type' in result) {
        if (result.media_type === 'movie') {
          return formatMovie(result as MovieResult)
        } else if (result.media_type === 'tv') {
          return formatTvShow(result as TvResult)
        } else {
          // No matching type
          return undefined
        }
      } else {
        // No matching type
        return undefined
      }
    })
    .filter((item: CombinedListItem | undefined): item is CombinedListItem => {
      return item !== undefined
    })
}
