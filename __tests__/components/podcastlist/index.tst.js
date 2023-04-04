import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom";
import PodcastList from "../../../app/components/PodcastList";
const podcastMockJson = require("./podcast-mock.json");

const PODCASTS_URL =
  "https://api.allorigins.win/get?url=" +
  encodeURIComponent(
    "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json"
  );

jest.mock("../../../services/CacheService", () => ({
  getInstance: () => ({
    cache: {
      get: jest.fn(() => null),
      set: jest.fn(),
    },
  }),
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({ contents: JSON.stringify({ feed: { entry: [] } }) }),
  })
);

describe("PodcastList", () => {
  test("renders search input", async () => {
    await act(async () => {
      render(<PodcastList />);
    });
    const searchInput = screen.getByPlaceholderText(/Filter podcast/i);
    expect(searchInput).toBeInTheDocument();
  });

  test("fetches podcasts on mount", async () => {
    await act(async () => {
      render(<PodcastList />);
    });
    expect(fetch).toHaveBeenCalledWith(PODCASTS_URL);
  });

  test("filters podcasts based on search term", async () => {
    const mockPodcasts = {
      contents: JSON.stringify(podcastMockJson),
    };
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({ json: () => Promise.resolve(mockPodcasts) })
    );

    await act(async () => {
      render(<PodcastList />);
    });

    const searchInput = screen.getByPlaceholderText(/Filter podcast/i);
    fireEvent.change(searchInput, {
      target: { value: "The Joe Budden Podcast".toUpperCase() },
    });
    expect(
      screen.getByText("The Joe Budden Podcast".toUpperCase())
    ).toBeInTheDocument();
    expect(screen.queryByText("Another Podcast")).not.toBeInTheDocument();
  });
});
