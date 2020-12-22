import { Entry } from "../pages/receiptPrinter/ReceiptPrinter";
import { validate } from "../helpers";

/**
 * Extracts product description, quantity, price and checks
 * if the product is imported or not.
 *
 * Also checks if an input format is valid.
 * If not, throws an error.
 *
 * @param data
 * @returns an error or an object containing extracted values
 */
export const transformData = (data: string): Entry => {
  const isValid = validate(data);
  if (!isValid) {
    throw new Error(
      'Please use this format: "QTY PRODUCT PRICE". (e.g. 1 box of chocolate at 9.99)'
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
