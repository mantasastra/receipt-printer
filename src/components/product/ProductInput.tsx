import React, { ChangeEvent, useState } from "react";
import styled from "@emotion/styled";

import { State } from "../../pages/cashRegister/CashRegister";
import { transformData } from "../../app/index";
import { validate } from "../../helpers/index";

import Error from "../error/Error";

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

type Props = {
  onClick: React.Dispatch<React.SetStateAction<State>>;
  disable: boolean;
};

const ProductInput: React.FC<Props> = ({ onClick, disable }) => {
  const [input, setInput] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    const isValid = validate(value);
    if (isValid) {
      setError(null);

      onClick((prevState) => ({
        ...prevState,
        isError: false,
      }));
    }

    setInput(value);
  };

  const handleClear = () => {
    setInput("");
    setError(null);

    onClick((prevState) => ({
      ...prevState,
      isError: false,
    }));
  };

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = validate(input);
    if (!isValid) {
      setError(
        'Input should be of format: "QTY PRODUCT at PRICE" where PRICE must have 2 decimal places'
      );

      onClick((prevState) => ({
        ...prevState,
        isError: true,
      }));
    } else {
      const entry = transformData(input);

      setInput("");
      onClick((prevState) => ({
        ...prevState,
        entries: [...prevState.entries, entry],
      }));
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <label htmlFor="product">Add a Product</label>

      <input
        type="text"
        id="product"
        name="product"
        onChange={handleInput}
        value={input}
        disabled={disable}
      />
      {error ? <Error error={error} handleClear={handleClear} /> : null}
      <input type="submit" value="Add" disabled={error != null || disable} />
    </Form>
  );
};

export default ProductInput;
