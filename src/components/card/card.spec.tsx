import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Card from "./index";

const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

describe("Card", () => {
  const fakePlanet = {
    name: "Tatooine",
    terrain: "desert",
    diameter: "10465",
    climate: "arid",
    films: ["A New Hope", "Return of the Jedi"],
    url: "https://swapi.dev/api/planets/1/",
  };

  beforeEach(() => {
    mockPush.mockClear();
  });

  it("renders planet 1 info", () => {
    render(<Card planet={fakePlanet} />);
    expect(screen.getByText("Tatooine")).toBeInTheDocument();
  });

  it("navigates to planet page when clicked", () => {
    render(<Card planet={fakePlanet} />);
    fireEvent.click(screen.getByRole("button"));
    expect(mockPush).toHaveBeenCalledWith("/planet/1");
  });
});
