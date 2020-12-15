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

        const baseTax = isExempt ? 0 : entry.price * data.baseTaxRate;

        const importTax = entry.isImported
          ? entry.price * data.importTaxRate
          : 0;

        const taxApplied = round((baseTax + importTax) * entry.quantity);
        const taxedPrice = round(entry.price * entry.quantity + taxApplied);

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

      receipts.push(`Sales Taxes: ${round(salesTaxes)}`);
      receipts.push(`Total: ${round(totalPrice)}`);

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
