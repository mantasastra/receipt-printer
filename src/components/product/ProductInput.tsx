import React, { ChangeEvent } from "react";
import styled from "@emotion/styled";

import { Entry } from "../../pages/cashRegister/CashRegister";

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

type Props = {
  onClick: React.Dispatch<React.SetStateAction<Entry[]>>;
};

interface FormElements extends HTMLFormControlsCollection {
  product: HTMLInputElement;
}

/**
 * Extracts product description, quantity, price and checks
 * if the product is imported or not.
 *
 * TODO If the supplied data has a wrong format, returns error message.
 * Otherwise returns an object containing these extracted values.
 *
 * @param data of format 'QTY PRODUCT at PRICE'
 * where PRODUCT can contain a word `imported`
 */
const transformData = (data: HTMLInputElement): Entry => {
  const productDetails = data.value.split(" ");
  const isImported = data.value.search(/imported/i) > 0;

  const product = productDetails
    .splice(1, productDetails.length - 3)
    .join(" ")
    .replace("imported", "")
    .replace(/\s+/g, " ")
    .trim();
  const quantity = parseInt(productDetails[0]);
  const price = parseFloat(productDetails[productDetails.length - 1]);

  return {
    product,
    quantity,
    isImported,
    price,
  };
};

const ProductInput: React.FC<Props> = ({ onClick }) => {
  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { product } = e.target.elements as FormElements;
    const entry = transformData(product);
    product.value = "";

    onClick((prevState) => [...prevState, entry]);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <label htmlFor="product">Add a Product</label>

      <input type="text" id="product" name="product" />
      <input type="submit" value="Add" />
    </Form>
  );
};

export default ProductInput;
