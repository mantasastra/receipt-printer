import React from "react";
import styled from "@emotion/styled";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 5px 10px rgba(154, 160, 185, 0.05),
    0 15px 40px rgba(166, 173, 201, 0.2);
  background: linear-gradient(-135deg, #f5f5f5 5px, transparent 0) 0 5px,
    linear-gradient(135deg, #f5f5f5 5px, #fff 0) 0 5px;
  background-position: left top;
  background-repeat: repeat-x;
  background-size: 10px auto;
  animation: fadeIn 1s linear;

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @media only screen and (max-width: 700px) {
    width: 50%;
  }

  @media only screen and (max-width: 500px) {
    width: 70%;
  }

  @media only screen and (max-width: 400px) {
    width: 90%;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  border-bottom: 3px solid #000000;
`;

const Title = styled.h1`
  text-transform: uppercase;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  list-style-type: none;
  padding-top: 10px;
  padding-bottom: 10px;
  border-bottom: 3px solid #000000;
`;

const Item = styled.li`
  padding: 5px;
  text-transform: uppercase;
`;

const PriceContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const SalesTaxes = styled.p`
  padding-top: 10px;
  text-transform: uppercase;
  font-style: italic;
`;

const Total = styled.p`
  padding-top: 10px;
  text-transform: uppercase;
  font-size: 26px;
  font-weight: bold;
`;

type Props = {
  data: string[];
};

const Receipt: React.FC<Props> = ({ data }) => {
  const salesTaxes = data[data.length - 2];
  const total = data[data.length - 1];

  const receiptItems = data.map((value, index) => {
    const isNotTotalAndSalesTaxes =
      !value.includes("Total") && !value.includes("Sales Taxes");

    return isNotTotalAndSalesTaxes ? <Item key={index}>{value}</Item> : null;
  });

  return (
    <Container>
      <TitleContainer>
        <Title>Receipt</Title>
      </TitleContainer>
      <List>{receiptItems}</List>
      <PriceContainer>
        <SalesTaxes>{salesTaxes}</SalesTaxes>
      </PriceContainer>
      <PriceContainer>
        <Total>{total}</Total>
      </PriceContainer>
    </Container>
  );
};

export default Receipt;
