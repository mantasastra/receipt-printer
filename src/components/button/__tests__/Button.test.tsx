import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "../Button";

describe("Button", () => {
  it("should render an input type button", () => {
    render(
      <Button
        type="input"
        text="__BUTTON__"
        styles={{ bgColor: "#000", textColor: "#fff" }}
      />
    );

    expect(screen.getByTestId("input-button")).toBeInTheDocument();
    expect(screen.queryByTestId("button")).not.toBeInTheDocument();
  });

  it("should render a button type button", () => {
    render(
      <Button
        text="__BUTTON__"
        styles={{ bgColor: "#000", textColor: "#fff" }}
      />
    );

    expect(screen.getByTestId("button")).toBeInTheDocument();
    expect(screen.queryByTestId("input-button")).not.toBeInTheDocument();
  });

  it("should render a disabled button", () => {
    const { rerender } = render(
      <Button
        type="input"
        text="__BUTTON__"
        styles={{ bgColor: "#000", textColor: "#fff" }}
        disabled={true}
      />
    );

    expect(screen.getByTestId("input-button")).toBeDisabled();

    rerender(
      <Button
        text="__BUTTON__"
        styles={{ bgColor: "#000", textColor: "#fff" }}
        disabled={true}
      />
    );

    expect(screen.getByTestId("button")).toBeDisabled();
  });

  it("should handle a click", () => {
    const mockClick = jest.fn();

    render(
      <Button
        text="__BUTTON__"
        onClick={mockClick}
        styles={{ bgColor: "#000", textColor: "#fff" }}
      />
    );

    userEvent.click(screen.getByTestId("button"));
    expect(mockClick).toHaveBeenCalledTimes(1);
  });
});
