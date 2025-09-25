import { render, screen, waitFor } from "@testing-library/react";
import * as NextNavigation from "next/navigation";
import PlanetPage from "./page";
import React from "react";

jest.mock("@/components/loading", () => {
  const Loading: React.FC = () => <div data-testid="loading" />;
  Loading.displayName = "Loading";
  return Loading;
});

jest.mock("next/navigation", () => ({
  useParams: jest.fn(),
}));

const mockUseParams = NextNavigation.useParams as jest.Mock;

const mockFetch = jest.fn();
global.fetch = mockFetch as unknown as typeof fetch;

describe("PlanetPage", () => {
  beforeEach(() => {
    mockFetch.mockReset();
    mockUseParams.mockReturnValue({ id: "1" });
  });

  it("renders loading initially and then planet info", async () => {
    mockFetch.mockResolvedValueOnce({
      json: async () => ({
        name: "Tatooine",
        terrain: "desert",
        diameter: "10465",
        climate: "arid",
        gravity: "1 standard",
        population: "200000",
        rotation_period: "23",
        orbital_period: "304",
        residents: [],
      }),
    });

    render(<PlanetPage />);

    expect(screen.getByTestId("loading")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Tatooine")).toBeInTheDocument();
    });

    expect(screen.getByText(/Terrain: desert/i)).toBeInTheDocument();
    expect(screen.getByText(/Diameter: 10465/i)).toBeInTheDocument();
    expect(screen.getByText(/Climate: arid/i)).toBeInTheDocument();
    expect(screen.getByText(/Gravity: 1 standard/i)).toBeInTheDocument();
    expect(screen.getByText(/Population: 200000/i)).toBeInTheDocument();
    expect(screen.getByText(/Rotation Period: 23/i)).toBeInTheDocument();
    expect(screen.getByText(/Orbital Period: 304/i)).toBeInTheDocument();
    expect(screen.getByText("No known residents")).toBeInTheDocument();
  });
});
