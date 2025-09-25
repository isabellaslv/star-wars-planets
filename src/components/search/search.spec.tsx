import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Search from "./index";

describe("Search component", () => {
  it("renders input and button", () => {
    const handleChange = jest.fn();
    render(<Search onChange={handleChange} />);

    const input = screen.getByPlaceholderText("Search planets by name");
    const button = screen.getByRole("button", { name: /search/i });

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it("calls onChange when typing", () => {
    const handleChange = jest.fn();
    render(<Search onChange={handleChange} />);

    const input = screen.getByPlaceholderText("Search planets by name");

    fireEvent.change(input, { target: { value: "Tatooine" } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
