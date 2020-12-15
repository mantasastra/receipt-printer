import React, { useState } from "react";
import styled from "@emotion/styled";

import ProductInput from "../../components/product/ProductInput";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export type Entry = {
  product: string;
  quantity: number;
  price: number;
  isImported: boolean;
};

const CashRegister = () => {
  const [entries, setEntries] = useState<Entry[]>([]);

  console.log(entries);
  return (
    <Container>
      <h1>Cash Register</h1>
      <ProductInput onClick={setEntries} />
    </Container>
  );
};

export default CashRegister;
