'use client'
import { useEffect, useState } from "react";
import CacheService from "@/services/CacheService";
import GridSection from "./GridSection";
import Podcast from "./Podcast";
import SearchInput from "./SearchInput";
import TopDiv from "./TopDiv";

const PODCASTS_URL = "https://api.allorigins.win/get?url=" + encodeURIComponent("https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json");

const cache = CacheService.getInstance().cache;

export default function PodcastList() {
  const [rawPodcasts, setRawPodcasts] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchPodcasts() {
      const cachedData = cache.get(PODCASTS_URL);
      if (cachedData) {
        setRawPodcasts(cachedData);
      } else {
        const response = await fetch(PODCASTS_URL);
        const data = await response.json();
        cache.set(PODCASTS_URL, data);
        setRawPodcasts(data);
      }
    }

    fetchPodcasts();
  }, []);

  const filterPodcasts = (podcast) => {
    const podcastName = podcast["im:name"].label.toLowerCase();
    const artistName = podcast["im:artist"].label.toLowerCase();
    const term = searchTerm.toLowerCase();
    return podcastName.includes(term) || artistName.includes(term);
  };

  const podcastList = rawPodcasts?.contents
    ? JSON.parse(rawPodcasts.contents).feed.entry.filter(filterPodcasts)
    : [];

  return (
    <div>
      <TopDiv>
        <SearchInput setSearchTerm={setSearchTerm} />
      </TopDiv>
      <GridSection>
        {podcastList.map((podcast, index) => (
          <Podcast key={index} podcast={podcast} />
        ))}
      </GridSection>
    </div>
  );
}
