'use client'
import { useEffect, useState } from "react";
import { getAllPodcasts } from "@/services/PodcastsService";
import CacheService from "@/services/CacheService";
import Podcast from "./Podcast";
import SearchInput from "./SearchInput";
import styled from "styled-components";

const GridSection = styled.section`
    display:grid;
    gap:1rem;
    grid-template-columns:repeat(auto-fit, minmax(10rem, 1fr));
    height:100%;
    width:100%;
`;
const TopDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: end;
    align-items: center;
    width:100%;
    margin-bottom: 1rem;
    gap:2rem;
`
const PodcastLenght = styled.div`
    font-size: 1.5rem;
    font-weight: 700;
    color: #fff;
    text-align: center;
    background-color: dodgerblue;
    padding:0.5rem 1rem;
    border-radius:5px;
`
const PODCASTS_CACHE_KEY = 'podcasts';
export default function PodcastList() {
  const [rawPodcasts, setRawPodcasts] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

useEffect(() => {
    async function fetchPodcasts() {
      const cachedData = CacheService.get(PODCASTS_CACHE_KEY);
      if (cachedData) {
        setRawPodcasts(cachedData);
      } else {
        const data = await getAllPodcasts();
        CacheService.set(PODCASTS_CACHE_KEY, data);
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
        <PodcastLenght data-testid="podcast-length">
          {podcastList.length}
        </PodcastLenght>
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
