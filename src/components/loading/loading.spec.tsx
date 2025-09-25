import { render, screen } from "@testing-library/react";
import Loading from "./index";

describe("Loading component", () => {
  it("renders loading spinner", () => {
    render(<Loading />);

    const container = screen.getByRole("progressbar");
    expect(container).toBeInTheDocument();

    expect(container).toHaveClass("loading");
  });
});
