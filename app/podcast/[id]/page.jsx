'use client'
import '../../../styles/globals.css'
import { useEffect, useState } from 'react';
import LateralInfo from '@/app/components/LateralInfo';
import styled from 'styled-components';
import CustomLink from '@/app/components/CustomLink';
import CacheService from '@/services/CacheService';
import { formatDate, milisecsToTime } from '@/utils/utils';
const StyledContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    gap: 10rem;
    padding: 1rem;
`
const StyledTable = styled.table`
    border-collapse: collapse;
    width: 100%;
    border: 1px solid #ddd;
    th, td {
        text-align: left;
        padding: 16px;
    }
    tr:nth-child(even) {
        background-color: #f2f2f2;
    }
    tr:hover {
        background-color: #ddd;
    }
    th {
        background-color: white;
        color: black;
    }
`
const cache = CacheService.getInstance().cache;
export default function PodcastDetailPage({ params }) {
    const url = `https://api.allorigins.win/get?url=${encodeURIComponent(`https://itunes.apple.com/lookup?id=${params.id}&media=podcast&entity=podcastEpisode&limit=20`)}`
    const [podcastInfo, setPodcastInfo] = useState(null);
    
      useEffect(() => {
        async function fetchData() {
          try {
            const cachedData = cache.get(url);
            if (cachedData) {
              setPodcastInfo(cachedData);
              localStorage.setItem('podcastInfo', JSON.stringify(cachedData));
            } else {
              const response = await fetch(url);
              const data = await response.json();
              const podcastData = JSON.parse(data.contents).results.slice(1);
              setPodcastInfo(podcastData);
              cache.set(url, podcastData);
              localStorage.setItem('podcastInfo', JSON.stringify(podcastData));
            }
          } catch (error) {
            console.error(error);
          }
        }
      
        fetchData();
      }, []);

  return (
    <StyledContainer>
        {podcastInfo && <LateralInfo podcast={podcastInfo[0]} />}
        <ul>
            <StyledTable>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Date</th>
                        <th>Duration</th>
                    </tr>
                </thead>
                <tbody>
                {podcastInfo && podcastInfo.map((podcast) => (
                    <tr key={podcast.trackId}>
                        <td>
                            <CustomLink href={`/podcast/${params.id}/episode/${podcast.trackId}`} >
                                {podcast.trackName}
                            </CustomLink>
                        </td>
                        <td>{formatDate(podcast.releaseDate)}</td>
                        <td>{milisecsToTime(podcast.trackTimeMillis)}</td>
                    </tr>
                ))}
                </tbody>
            </StyledTable>
        </ul>
    </StyledContainer>
     );
}