import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";

import data from "../../data/data";
import { calculateTax, createReceipt } from "../../helpers/index";

import ProductInput from "../../components/product/ProductInput";
import Receipt from "../../components/receipt/Receipt";

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
};

export interface EntryWithTax extends Entry {
  taxApplied: number;
  taxedPrice: number;
}

export type State = {
  entries: Entry[];
  receiptData: string[];
  printReceipt: boolean;
};

// TODO Add error handling for input
// TODO Show zeroes in decimals
// TODO Add reset functionality
// TODO Add styles
// TODO Add tests
const CashRegister = () => {
  const [state, setState] = useState<State>({
    entries: [],
    receiptData: [],
    printReceipt: false,
  });
  const { entries, receiptData, printReceipt } = state;

  useEffect(() => {
    if (printReceipt) {
      const entriesWithTax = calculateTax(entries, data);
      const receipt = createReceipt(entriesWithTax);

      setState((prevState) => ({
        ...prevState,
        receiptData: receipt,
      }));
    }
  }, [entries, printReceipt]);

  const handleClick = (): void => {
    setState((prevState) => ({
      ...prevState,
      printReceipt: true,
    }));
  };

  return (
    <Container>
      <h1>Cash Register</h1>
      <ProductInput onClick={setState} />
      <button onClick={handleClick}>Print Receipt</button>
      {printReceipt ? <Receipt data={receiptData} /> : null}
    </Container>
  );
};

export default CashRegister;
