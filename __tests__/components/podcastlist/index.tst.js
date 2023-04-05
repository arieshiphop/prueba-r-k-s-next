import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom";
import fetchMock from "jest-fetch-mock";
import PodcastList from "../../../app/components/PodcastList";
const podcastMockJson = require("./podcast-mock.json");
global.fetch = fetchMock;
// const PODCASTS_URL =
//   "https://api.allorigins.win/get?url=" +
//   encodeURIComponent(
//     "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json"
//   );

describe("PodcastList", () => {
  beforeEach(() => {
    fetch.resetMocks(); // reset mock between tests
    const mockPodcasts = {
      contents: JSON.stringify(podcastMockJson),
    };
    fetch.mockResponseOnce(JSON.stringify(mockPodcasts));
  });
  test("renders search input", async () => {
    await act(async () => {
      render(<PodcastList />);
    });
    const searchInput = screen.getByPlaceholderText(/Filter podcast/i);
    expect(searchInput).toBeInTheDocument();
  });

  test("filters podcasts based on search term", async () => {
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
  test("Podcast has link to detail", async () => {
    await act(async () => {
      render(<PodcastList />);
    });
    const podcast = screen.getByText("The Joe Budden Podcast".toUpperCase());
    const podcastParent = podcast.parentElement;
    const parentContainer = podcastParent.parentElement;
    expect(parentContainer).toHaveAttribute("href", "/podcast/1535809341");
  });
  test("Podcast list lenght div has correct length", async () => {
    await act(async () => {
      render(<PodcastList />);
    });
    const podcastListLength = screen.getByTestId("podcast-length");
    expect(podcastListLength).toHaveTextContent("2");
  });
});
