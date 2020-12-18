import React, { useState } from "react";
import styled from "@emotion/styled";

import data from "../../data/data";
import { calculateTax, createReceipt } from "../../core";

import ProductInput from "../../components/product/ProductInput";
import Receipt from "../../components/receipt/Receipt";
import Button from "../../components/button/Button";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Card = styled.div`
  padding: 50px 50px;
  width: 50%;
  background: #fafafa;
  border-radius: 20px;
  box-shadow: 0 5px 10px rgba(154, 160, 185, 0.05),
    0 15px 40px rgba(166, 173, 201, 0.2);

  @media only screen and (max-width: 700px) {
    width: 70%;
  }

  @media only screen and (max-width: 500px) {
    width: 90%;
  }

  @media only screen and (max-width: 400px) {
    width: 100%;
  }
`;

const Title = styled.h1`
  padding: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px;
  animation: fadeIn 1s linear;

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @media only screen and (max-width: 900px) {
    justify-content: center;
  }
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
  isError: boolean;
};

const CashRegister = () => {
  const [state, setState] = useState<State>({
    entries: [],
    receiptData: [],
    printReceipt: false,
    isError: false,
  });
  const { entries, receiptData, printReceipt, isError } = state;

  const handlePrint = () => {
    const entriesWithTax = calculateTax(entries, data);
    const receipt = createReceipt(entriesWithTax);

    setState((prevState) => ({
      ...prevState,
      receiptData: receipt,
      printReceipt: true,
    }));
  };

  const handleReset = () => {
    setState({
      entries: [],
      receiptData: [],
      printReceipt: false,
      isError: false,
    });
  };

  return (
    <Container>
      <Title data-testid="title">Cash Register</Title>
      <Card>
        <ProductInput onClick={setState} disabled={printReceipt} />

        <ButtonContainer>
          <Button
            text="Print Receipt"
            isError={isError}
            disabled={printReceipt}
            onClick={handlePrint}
            styles={{ bgColor: "#212121", textColor: "#ffffff" }}
          />
        </ButtonContainer>
      </Card>
      {printReceipt ? (
        <>
          <Receipt data={receiptData} />
          <ButtonContainer>
            <Button
              text="Start again"
              onClick={handleReset}
              styles={{ bgColor: "#212121", textColor: "#ffffff" }}
            />
          </ButtonContainer>
        </>
      ) : null}
    </Container>
  );
};

export default CashRegister;
