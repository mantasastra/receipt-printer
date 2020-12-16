import React from "react";

type Props = {
  error: string;
  handleClear: () => void;
};

const Error: React.FC<Props> = ({ error, handleClear }) => (
  <div>
    <p data-testid="error-message" style={{ color: "red" }}>
      {error}
    </p>
    <button onClick={handleClear}>Clear</button>
  </div>
);

export default Error;
