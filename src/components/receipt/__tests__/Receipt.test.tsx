import React from "react";
import { render, screen } from "@testing-library/react";
import Receipt from "../Receipt";

describe("Receipt", () => {
  it("should show a receipt", () => {
    const mockData = [
      "1 imported box of chocolates: 10.50",
      "1 packet of headache pills: 9.75",
      "2 book: 24.98",
      "Sales Taxes: 0.50",
      "Total: 45.23",
    ];

    render(<Receipt data={mockData} />);

    mockData.forEach((data) => {
      expect(screen.getByText(data)).toBeInTheDocument();
    });
  });
});
