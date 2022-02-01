import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'

export const formatDate = (isoString: string) => {
  return format(parseISO(isoString), 'do MMM yyyy')
}
