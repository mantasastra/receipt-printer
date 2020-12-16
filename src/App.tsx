import styled from "@emotion/styled";
import CashRegister from "./pages/cashRegister/CashRegister";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: 100vh;
`;

const App = () => {
  return (
    <Container>
      <CashRegister />
    </Container>
  );
};

export default App;
