/**
 * Round the number to 2 decimal places.
 *
 * @param number
 * @returns a rounded number
 */
export const round = (number: number): number =>
  Math.round((number + Number.EPSILON) * 100) / 100;

/**
 * Round the number to the nearest five cents (0.05)
 * @param number
 * @returns a rounded number to the increment of five cents
 */
export const roundUpToFiveCents = (number: number): number =>
  Math.ceil(number * 20) / 20;
