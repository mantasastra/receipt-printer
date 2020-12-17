import React from "react";
import styled from "@emotion/styled";
import Button from "../button/Button";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const ErrorMessage = styled.span`
  padding-bottom: 10px;
  font-size: 0.94rem;
  color: #b50706;
  letter-spacing: 0.028rem;
  overflow-wrap: break-word;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;

  button {
    padding-left: 21px;
    padding-right: 21px;
  }
`;

type Props = {
  error: string;
  handleClear: () => void;
};

const Error: React.FC<Props> = ({ error, handleClear }) => (
  <Container>
    <ErrorMessage data-testid="error-message">{error}</ErrorMessage>
    <ButtonContainer>
      <Button
        text="Clear"
        onClick={handleClear}
        styles={{ bgColor: "#e0e0e0", textColor: "#000000" }}
      />
    </ButtonContainer>
  </Container>
);

export default Error;
