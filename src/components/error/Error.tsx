import React from "react";

type Props = {
  error: string;
  handleClear: () => void;
};

const Error: React.FC<Props> = ({ error, handleClear }) => (
  <div>
    <p style={{ color: "red" }}>{error}</p>
    <button onClick={handleClear}>Clear</button>
  </div>
);

export default Error;
