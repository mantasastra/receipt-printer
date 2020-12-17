import React, { ChangeEvent, useState } from "react";
import styled from "@emotion/styled";

import { State } from "../../pages/cashRegister/CashRegister";
import { transformData } from "../../core";
import { validate } from "../../helpers";

import Error from "../error/Error";
import Button from "../button/Button";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const InputGroup = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
`;

const Input = styled.input<{ isError: string | null }>`
  width: 100%;
  padding-top: 0.8rem;
  padding-bottom: 0.5rem;
  padding-left: 0.8rem;
  border: none;
  border-bottom: 0.12rem solid rgba(19, 19, 21, 0.6);
  height: 2rem;
  font-size: 1.06rem;
  line-height: 147.6%;

  &:focus {
    outline: none;
  }

  &:hover {
    background: rgba(73, 133, 224, 0.12);
    border-color: #121212;
  }

  &:focus + label,
  &:valid + label {
    top: 0;
    font-size: 0.94rem;
    margin-bottom: 32px;
  }

  &:disabled {
    background: none;
    border-color: rgba(19, 19, 21, 0.6);
  }

  ${(props) => (props.isError ? "border-bottom: 0.12rem solid #b50706" : null)}
`;

const Label = styled.span<{ isError: string | null }>`
  position: absolute;
  top: -1.4rem;
  left: 0.875rem;
  line-height: 147.6%;
  color: rgba(19, 19, 21, 0.6);

  ${(props) => (props.isError ? "color: #b50706" : null)}
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;

  input {
    padding-left: 30px;
    padding-right: 30px;
  }
`;

type Props = {
  onClick: React.Dispatch<React.SetStateAction<State>>;
  disabled: boolean;
};

const ProductInput: React.FC<Props> = ({ onClick, disabled }) => {
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
      <InputGroup>
        <label htmlFor="product">
          <Input
            data-testid="product-entry"
            type="text"
            id="product"
            name="product"
            placeholder="e.g. 1 box of chocolates at 9.99"
            onChange={handleInput}
            value={input}
            disabled={disabled}
            isError={error}
          />
          <Label isError={error}>Add a Product</Label>
          {error ? <Error error={error} handleClear={handleClear} /> : null}
        </label>
      </InputGroup>

      <ButtonContainer>
        <Button
          type="input"
          text="Add"
          isError={error != null}
          disabled={disabled}
          styles={{ bgColor: "#81c784", textColor: "#fffff" }}
        />
      </ButtonContainer>
    </Form>
  );
};

export default ProductInput;
