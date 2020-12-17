import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CashRegister from "../CashRegister";

describe("CashRegister", () => {
  it("should print the receipt after inputting a product", () => {
    render(<CashRegister />);

    const input = screen.getByTestId("product-entry");

    expect(screen.getByTestId("title")).toBeInTheDocument();
    expect(input).toBeInTheDocument();

    userEvent.type(input, "1 imported box of chocolates at 12.99");
    userEvent.click(screen.getByRole("button", { name: /add/i }));
    userEvent.click(screen.getByRole("button", { name: /print receipt/i }));

    expect(
      screen.getByText("1 imported box of chocolates: 13.64")
    ).toBeInTheDocument();
    expect(screen.getByText("Sales Taxes: 0.65")).toBeInTheDocument();
    expect(screen.getByText("Total: 13.64")).toBeInTheDocument();

    userEvent.click(screen.getByRole("button", { name: /start again/i }));

    expect(
      screen.queryByTestId("1 imported box of chocolates: 13.64")
    ).not.toBeInTheDocument();
    expect(screen.queryByTestId("Sales Taxes: 0.65")).not.toBeInTheDocument();
    expect(screen.queryByTestId("Total: 13.64")).not.toBeInTheDocument();
  });

  it("should allow to input and print a receipt after the error has been cleared", () => {
    render(<CashRegister />);

    const input = screen.getByTestId("product-entry");
    const addButton = screen.getByRole("button", { name: /add/i });

    userEvent.type(input, "not a product");
    userEvent.click(addButton);

    expect(screen.getByTestId(/error-message/i)).toBeInTheDocument();
    userEvent.click(screen.getByRole("button", { name: /clear/i }));

    userEvent.type(input, "1 packet of headache pills at 9.75");
    userEvent.click(addButton);
    userEvent.click(screen.getByRole("button", { name: /print receipt/i }));

    expect(
      screen.getByText("1 packet of headache pills: 9.75")
    ).toBeInTheDocument();
    expect(screen.getByText("Sales Taxes: 0.00")).toBeInTheDocument();
    expect(screen.getByText("Total: 9.75")).toBeInTheDocument();
  });
});
