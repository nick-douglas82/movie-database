export const convertMinsToHrsMins = (mins: number): string => {
  let h = Math.floor(mins / 60)
  let m = mins % 60
  return `${h != 0 ? h + 'h' : ''} ${m < 10 ? '0' + m : m}mins`
}

export const averageRunTime = (times: number[]): number => {
  const total = times.reduce((partialSum, a) => partialSum + a, 0)
  return Math.round(total / times.length)
}
