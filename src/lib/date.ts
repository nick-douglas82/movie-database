import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'
import differenceInCalendarYears from 'date-fns/differenceInCalendarYears'
import parse from 'date-fns/parse'

export const formatDate = (isoString?: string) => {
  if (!isoString) {
    return undefined
  }
  return format(parseISO(isoString), 'do MMM yyyy')
}

export const formatDateToYear = (isoString: string) => {
  if (!isoString) {
    return undefined
  }
  return format(parseISO(isoString), 'yyyy')
}

export const calculateAge = (isoString: string) => {
  if (!isoString) {
    return undefined
  }
  const date = parse(isoString, 'yyyy-MM-dd', new Date())
  const age = differenceInCalendarYears(new Date(), date)
  return age
}
