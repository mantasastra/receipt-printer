import React from "react";

type Props = {
  data: string[];
};

const Receipt: React.FC<Props> = ({ data }) => {
  const receipt = data.map((value, index) => <li key={index}>{value}</li>);

  return <ul>{receipt}</ul>;
};

export default Receipt;
