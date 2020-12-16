import React from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

const ButtonStyles = css`
  border: none;
  border-radius: 3px;
  box-shadow: 0 -3px 0 rgba(0, 0, 0, 0.15) inset;
  padding: 10px;
  color: #fff;
  cursor: pointer;
  text-transform: uppercase;
  white-space: nowrap;
  transition-property: transform;
  transform: translateZ(0);
  transition: box-shadow 0.5s cubic-bezier(0.39, 0.5, 0.15, 1.36);

  &:disabled {
    background-color: #7f7f7f;
    color: #dddddd;
    transform: none;
    transition: none;
    transition-property: none;
    box-shadow: none;
    cursor: not-allowed;

    &:hover {
      box-shadow: none;
    }
  }

  &:hover {
    box-shadow: 0 0 0 28px rgba(0, 0, 0, 0.25) inset;
  }

  &:active {
    transform: translateY(3px);
  }

  &:focus {
    outline: none;
  }
`;

const AddButton = styled.input<Styles>`
  ${ButtonStyles};

  ${(props) => ({
    backgroundColor: props.bgColor,
    color: props.textColor,
  })};
`;

const MainButton = styled.button<Styles>`
  ${ButtonStyles};

  ${(props) => ({
    backgroundColor: props.bgColor,
    color: props.textColor,
  })};
`;

type Styles = {
  bgColor: string;
  textColor: string;
};

type Props = {
  text: string;
  type?: string;
  isError?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  styles: Styles;
};

const Button: React.FC<Props> = ({
  text,
  type,
  isError,
  disabled,
  onClick,
  styles,
}) => {
  return type === "input" ? (
    <AddButton
      type="submit"
      value={text}
      disabled={isError || disabled}
      {...styles}
    />
  ) : (
    <MainButton onClick={onClick} disabled={isError || disabled} {...styles}>
      {text}
    </MainButton>
  );
};

export default Button;
