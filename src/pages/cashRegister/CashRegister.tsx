import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";

import data from "../../data/data";
import ProductInput from "../../components/product/ProductInput";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export type Entry = {
  product: string;
  quantity: number;
  isImported: boolean;
  price: number;
  taxApplied?: number;
  taxedPrice?: number;
};

const round = (number: number): number =>
  Math.round((number + Number.EPSILON) * 100) / 100;

// TODO Refactor the tax calculation into its own function
// TODO Add error handling for input
// TODO Show zeroes in decimals
// TODO Add reset functionality
// TODO Add styles
// TODO Add tests
const CashRegister = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [printReceipt, setPrintReceipt] = useState<boolean>(false);
  const [receipt, setReceipt] = useState<string[]>([]);

  useEffect(() => {
    if (printReceipt) {
      console.log("Printing...", entries);
      const entriesWithTax = entries.map((entry) => {
        const isExempt = data.exemptProductsFromBaseTax.some((product) =>
          entry.product.includes(product)
        );
        console.log(isExempt);

        const priceWithBaseTax = isExempt
          ? entry.price
          : round(entry.price + entry.price * data.baseTaxRate);

        const priceWithImportTax = entry.isImported
          ? round(priceWithBaseTax + priceWithBaseTax * data.importTaxRate)
          : priceWithBaseTax;

        const taxApplied = round(
          (priceWithImportTax - entry.price) * entry.quantity
        );
        const taxedPrice = priceWithImportTax * entry.quantity;

        return {
          ...entry,
          taxApplied,
          taxedPrice,
        };
      });

      let totalPrice = 0;
      let salesTaxes = 0;
      const receipts = entriesWithTax.map((entry) => {
        totalPrice += entry.taxedPrice;
        salesTaxes += entry.taxApplied;
        return `${entry.quantity} ${entry.isImported ? "imported" : ""} ${
          entry.product
        }: ${entry.taxedPrice}`;
      });

      receipts.push(`Sales Taxes: ${salesTaxes}`);
      receipts.push(`Total: ${totalPrice}`);

      setReceipt(receipts);
    }
    console.log(entries);
  }, [entries, printReceipt]);

  const renderedReceipt = receipt.map((value, index) => (
    <li key={index}>{value}</li>
  ));

  return (
    <Container>
      <h1>Cash Register</h1>
      <ProductInput onClick={setEntries} />
      <button onClick={() => setPrintReceipt(true)}>Print Receipt</button>
      {printReceipt ? <ul>{renderedReceipt}</ul> : null}
    </Container>
  );
};

export default CashRegister;
