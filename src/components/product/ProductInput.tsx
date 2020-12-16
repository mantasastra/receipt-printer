import React, { ChangeEvent, useState } from "react";
import styled from "@emotion/styled";

import { State } from "../../pages/cashRegister/CashRegister";
import { transformData } from "../../core";
import { validate } from "../../helpers";

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

    try {
      const entry = transformData(input);

      setInput("");
      onClick((prevState) => ({
        ...prevState,
        entries: [...prevState.entries, entry],
      }));
    } catch (err) {
      setError(err.message);
      onClick((prevState) => ({
        ...prevState,
        isError: true,
      }));
    }
  };

  return (
    <Form data-testid="product-form" onSubmit={handleSubmit}>
      <label htmlFor="product">Add a Product</label>

      <input
        data-testid="product-entry"
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
