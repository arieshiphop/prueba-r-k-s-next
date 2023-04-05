const getAllPodcasts = async () => {
  const PODCASTS_URL =
    "https://api.allorigins.win/get?url=" +
    encodeURIComponent(
      "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json"
    );
  const response = await fetch(PODCASTS_URL);
  const podcasts = await response.json();
  return podcasts;
};

const getPodcastDetails = async (id: string) => {
  const PODCAST_DETAILS_URL = `https://api.allorigins.win/get?url=${encodeURIComponent(
    `https://itunes.apple.com/lookup?id=${id}&media=podcast&entity=podcastEpisode&limit=20`
  )}"`;
  const response = await fetch(PODCAST_DETAILS_URL);
  const podcastDetails = await response.json();
  return podcastDetails;
};
export { getAllPodcasts, getPodcastDetails };
