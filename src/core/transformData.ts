import { Entry } from "../pages/cashRegister/CashRegister";
import { validate } from "../helpers";

/**
 * Extracts product description, quantity, price and checks
 * if the product is imported or not.
 *
 * @param data
 * @returns an error or an object containing extracted values
 */
export const transformData = (data: string): Entry => {
  const isValid = validate(data);
  if (!isValid) {
    throw new Error(
      'Input should be of format: "QTY PRODUCT at PRICE" where PRICE must have 2 decimal places'
    );
  }

  const productDetails = data.split(" ");
  const isImported = data.search(/imported/i) > 0;

  const product = productDetails
    .splice(1, productDetails.length - 3)
    .join(" ")
    .replace("imported", "")
    .replace(/\s+/g, " ") // remove repetitive whitespaces
    .trim();
  const quantity = parseInt(productDetails[0]);
  const price = parseFloat(productDetails[productDetails.length - 1]);

  return {
    product,
    quantity,
    isImported,
    price,
  };
};
