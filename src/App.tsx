import styled from "@emotion/styled";
import ReceiptPrinter from "./pages/receiptPrinter/ReceiptPrinter";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: 100vh;
`;

const App = () => {
  return (
    <Container>
      <ReceiptPrinter />
    </Container>
  );
};

export default App;
