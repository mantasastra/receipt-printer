import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Error from "../Error";

describe("Error", () => {
  it("should show an error message", () => {
    const mockError = "__ERROR__";
    const mockHandleClear = jest.fn();

    render(<Error error={mockError} handleClear={mockHandleClear} />);

    const clearButton = screen.getByRole("button", { name: /clear/i });

    expect(screen.getByText("__ERROR__")).toBeInTheDocument();
    expect(clearButton).toBeInTheDocument();

    userEvent.click(clearButton);
    expect(mockHandleClear).toHaveBeenCalled();
  });
});
