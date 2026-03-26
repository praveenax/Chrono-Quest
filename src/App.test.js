import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

jest.mock("./cards.json", () => [
  {
    title: "Event A",
    image: "https://example.com/a.jpg",
    time: { year: 1000, ad: true, month: 1, day: 1, display: "1000" },
  },
  {
    title: "Event B",
    image: "https://example.com/b.jpg",
    time: { year: 1200, ad: true, month: 1, day: 1, display: "1200" },
  },
  {
    title: "Event C",
    image: "https://example.com/c.jpg",
    time: { year: 1400, ad: true, month: 1, day: 1, display: "1400" },
  },
  {
    title: "Event D",
    image: "https://example.com/d.jpg",
    time: { year: 1600, ad: true, month: 1, day: 1, display: "1600" },
  },
  {
    title: "Event E",
    image: "https://example.com/e.jpg",
    time: { year: 1800, ad: true, month: 1, day: 1, display: "1800" },
  },
]);

jest.mock("lodash", () => ({
  __esModule: true,
  default: {
    shuffle: (arr) => arr,
  },
}));

test("renders game title and start button", () => {
  render(<App />);
  expect(screen.getByText("Chrono Quest!")).toBeInTheDocument();
  expect(screen.getByText("Start Game!")).toBeInTheDocument();
});

test("completes one round and shows score", async () => {
  render(<App />);

  fireEvent.click(screen.getByText("Start Game!"));

  for (let i = 0; i < 5; i += 1) {
    const activeCard = document.querySelector("#displayCard .centralCard");
    fireEvent.click(activeCard);
  }

  expect(await screen.findByText("End of Round!")).toBeInTheDocument();
  expect(screen.getByText(/Score 80/)).toBeInTheDocument();
});
