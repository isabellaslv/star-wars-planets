import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import PlanetsPage from "./page";

jest.mock("@/components/card", () => {
  const Card: React.FC = () => <div data-testid="card" />;
  Card.displayName = "Card";
  return Card;
});

jest.mock("@/components/search", () => {
  interface SearchProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }
  const Search: React.FC<SearchProps> = ({ onChange }) => (
    <input data-testid="search" onChange={onChange} />
  );
  Search.displayName = "Search";
  return Search;
});

jest.mock("@/components/loading", () => {
  const Loading: React.FC = () => <div data-testid="loading" />;
  Loading.displayName = "Loading";
  return Loading;
});

const mockFetch = jest.fn();
global.fetch = mockFetch as unknown as typeof fetch;

describe("PlanetsPage", () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  it("renders loading initially and calls fetch", async () => {
    mockFetch
      .mockResolvedValueOnce({
        json: async () => ({ results: [{ title: "A New Hope" }] }),
      })
      .mockResolvedValueOnce({
        json: async () => ({
          count: 1,
          results: [
            {
              name: "Tatooine",
              url: "url",
              terrain: "desert",
              diameter: "10465",
              climate: "arid",
              films: ["A New Hope"],
            },
          ],
        }),
      });

    render(<PlanetsPage />);

    expect(screen.getByTestId("loading")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTestId("card")).toBeInTheDocument();
    });

    expect(screen.getByTestId("search")).toBeInTheDocument();
  });
});
