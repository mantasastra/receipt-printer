import { Entry } from "../pages/cashRegister/CashRegister";

/**
 * Extracts product description, quantity, price and checks
 * if the product is imported or not.
 *
 * @param data - validated data
 * @returns an object containing extracted values
 */
const transformData = (data: string): Entry => {
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

export default transformData;
