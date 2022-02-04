export const convertMinsToHrsMins = (mins: number): string => {
  let h = Math.floor(mins / 60)
  let m = mins % 60
  return `${h < 10 ? h : h} hrs ${m < 10 ? '0' + m : m} mins`
}
