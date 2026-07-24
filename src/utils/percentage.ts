export const MAX_PERCENTAGE = 100

export const calculatePercentage = (explored: number, total: number): number => {
  if (total === 0) return 0

  return Math.round((explored / total) * MAX_PERCENTAGE)
}
