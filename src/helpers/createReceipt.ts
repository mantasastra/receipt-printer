import { EntryWithTax } from "../pages/cashRegister/CashRegister";
import round from "./round";
/**
 * Creates a receipt data from each product in entries.
 * This data is then used to render a receipt to the user.
 *
 * @param entries - contains products
 * @returns an array of receipt data
 */
const createReceipt = (entries: EntryWithTax[]): string[] => {
  let totalPrice = 0;
  let salesTaxes = 0;

  const receiptData = entries.map(
    ({ product, quantity, isImported, taxedPrice, taxApplied }) => {
      const imported = isImported ? "imported" : "";

      totalPrice += taxedPrice;
      salesTaxes += taxApplied;

      return `${quantity} ${imported} ${product}: ${taxedPrice}`;
    }
  );

  receiptData.push(`Sales Taxes: ${round(salesTaxes)}`);
  receiptData.push(`Total: ${round(totalPrice)}`);

  return receiptData;
};

export default createReceipt;
