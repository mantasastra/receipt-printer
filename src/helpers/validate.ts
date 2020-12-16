/**
 * Validates the input against a specific format of:
 * 'QTY PRODUCT at PRICE' where PRICE must have 2 decimal places.
 *
 * @param input
 * @returns boolean
 */
export const validate = (input: string): boolean => {
  const acceptableFormat = /^([0-9]+)\s*([a-zA-Z\s]+)\s*(at)\s*([0-9]*\.[0-9]{2})$/;

  return acceptableFormat.test(input);
};
