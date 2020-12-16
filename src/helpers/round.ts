/**
 * Round the number to 2 decimal places.
 *
 * @param number
 * @returns a rounded number
 */
const round = (number: number): number =>
  Math.round((number + Number.EPSILON) * 100) / 100;

export default round;
