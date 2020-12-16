import { Data } from "../data/data";
import { Entry, EntryWithTax } from "../pages/cashRegister/CashRegister";
import { round } from "../helpers/index";

/**
 * Checks whether base and import tax needs to be applied on a product.
 * If needed, it applies the required tax to each product in the entries.
 *
 * @param entries - contains products
 * @param data - supplied tax data
 * @returns new entries with tax applied
 */
const calculateTax = (entries: Entry[], data: Data): EntryWithTax[] => {
  return entries.map((entry) => {
    const { price: basePrice, quantity } = entry;

    const isExempt = data.exemptProductsFromBaseTax.some((product) =>
      entry.product.includes(product)
    );
    const baseTax = isExempt ? 0 : basePrice * data.baseTaxRate;
    const importTax = entry.isImported ? basePrice * data.importTaxRate : 0;

    const taxApplied = round((baseTax + importTax) * quantity);
    const taxedPrice = round(basePrice * quantity + taxApplied);

    return {
      ...entry,
      taxApplied,
      taxedPrice,
    };
  });
};

export default calculateTax;
