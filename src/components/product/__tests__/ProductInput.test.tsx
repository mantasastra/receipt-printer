import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductInput from "../ProductInput";

describe("ProductInput", () => {
  it("should render a form with an input", () => {
    const mockOnClick = jest.fn();

    render(<ProductInput onClick={mockOnClick} disabled={false} />);

    expect(screen.getByTestId("product-form")).toBeInTheDocument();
    expect(screen.getByTestId("product-entry")).toBeInTheDocument();
  });

  it("should call handleInput and handleSubmit", () => {
    const mockOnClick = jest.fn();
    const mockProduct = "1 imported box of chocolates at 10.00";

    render(<ProductInput onClick={mockOnClick} disabled={false} />);

    const productInput = screen.getByTestId("product-entry");

    userEvent.type(productInput, mockProduct);
    expect(productInput).toHaveValue(mockProduct);
    expect(mockOnClick).toHaveBeenCalledTimes(1);

    userEvent.click(screen.getByRole("button", { name: /add/i }));
    expect(mockOnClick).toHaveBeenCalledTimes(2);
  });

  it("should disable the input and the button", () => {
    const mockOnClick = jest.fn();

    render(<ProductInput onClick={mockOnClick} disabled={true} />);

    expect(screen.getByTestId("product-entry")).toBeDisabled();
    expect(screen.getByRole("button", { name: /add/i })).toBeDisabled();
  });

  it("should show an error if an incorrect format input is entered", async () => {
    const mockOnClick = jest.fn();
    const mockIncorrectProduct = "something something";

    render(<ProductInput onClick={mockOnClick} disabled={false} />);

    const productInput = screen.getByTestId("product-entry");

    userEvent.type(productInput, mockIncorrectProduct);
    expect(productInput).toHaveValue(mockIncorrectProduct);

    userEvent.click(screen.getByRole("button", { name: /add/i }));
    expect(screen.getByTestId(/error-message/i)).toBeInTheDocument();

    userEvent.click(screen.getByRole("button", { name: /clear/i }));
    expect(productInput).toHaveValue("");
  });
});
