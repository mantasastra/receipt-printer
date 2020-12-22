import { EntryWithTax } from "../pages/receiptPrinter/ReceiptPrinter";
import { round } from "../helpers";

/**
 * Creates a receipt data from each product in entries.
 * This data is then used to render a receipt to the user.
 *
 * @param entries - contains products
 * @returns an array of receipt data
 */
export const createReceipt = (entries: EntryWithTax[]): string[] => {
  let totalPrice = 0;
  let salesTaxes = 0;

  const receiptData = entries.map(
    ({ product, quantity, isImported, taxedPrice, taxApplied }) => {
      const imported = isImported ? " imported" : "";

      totalPrice += taxedPrice;
      salesTaxes += taxApplied;

      return `${quantity}${imported} ${product}: ${taxedPrice.toFixed(2)}`;
    }
  );

  receiptData.push(`Sales Taxes: ${round(salesTaxes).toFixed(2)}`);
  receiptData.push(`Total: ${round(totalPrice).toFixed(2)}`);

  return receiptData;
};
