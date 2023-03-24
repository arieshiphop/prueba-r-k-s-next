'use client'
import GridSection from "./GridSection"
import Podcast from "./Podcast"
import SearchInput from "./SearchInput"
import TopDiv from "./TopDiv"
import { useEffect, useState } from "react"
import CacheService from "@/services/CacheService"
const url = `https://api.allorigins.win/get?url=${encodeURIComponent('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json')}`
const cache = CacheService.getInstance().cache;
export default function PodcastList() {
  const [rawPodcasts, setRawPodcasts] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  useEffect(() => {
    async function fetchData() {
      const cachedData = cache.get(url);
      if (cachedData) {
        setRawPodcasts(cachedData);
        return;
      }

      const res = await fetch(url);
      const data = await res.json();
      cache.set(url, data);
      setRawPodcasts(data);
    }

    fetchData();
  }, []);
  
  const filterPodcasts = podcast => {
    const podcastName = podcast["im:name"].label.toLowerCase()
    const artistName = podcast["im:artist"].label.toLowerCase()
    const term = searchTerm.toLowerCase()
    return podcastName.includes(term) || artistName.includes(term)
  }

  const podcastList = rawPodcasts?.contents
    ? JSON.parse(rawPodcasts.contents).feed.entry.filter(filterPodcasts)
    : []

  return (
    <div>
        <TopDiv>
            <SearchInput setSearchTerm={setSearchTerm} />
        </TopDiv>
      <GridSection>
        {podcastList.map((podcast, index) => (
          <Podcast key={index} podcast={podcast}  />
        ))}
      </GridSection>
    </div>
  )
}
