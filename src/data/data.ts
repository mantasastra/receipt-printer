type ExemptProducts = "book" | "chocolate" | "pills";

export type Data = {
  baseTaxRate: number;
  importTaxRate: number;
  exemptProductsFromBaseTax: Array<ExemptProducts>;
};

const data: Data = {
  baseTaxRate: 0.1,
  importTaxRate: 0.05,
  exemptProductsFromBaseTax: ["book", "chocolate", "pills"],
};

export default data;
