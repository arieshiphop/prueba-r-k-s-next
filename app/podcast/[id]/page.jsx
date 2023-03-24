'use client'
import '../../../styles/globals.css'
import { useEffect, useState } from 'react';
import LateralInfo from '@/app/components/LateralInfo';
import styled from 'styled-components';
import { Suspense } from 'react';
import CustomLink from '@/app/components/CustomLink';
import CacheService from '@/services/CacheService';
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
    const milisecsToTime = (milisecs) => {
        const seconds = Math.floor((milisecs / 1000) % 60).toString().padStart(2, "0");
        const minutes = Math.floor((milisecs / (1000 * 60)) % 60).toString().padStart(2, "0");
        const hours = Math.floor((milisecs / (1000 * 60 * 60)) % 24).toString().padStart(2, "0");
        return hours > 0 ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`;
    }
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      }
    useEffect(() => {
        async function fetchData() {
            if (cache.has(url)) {
                setPodcastInfo(cache.get(url));
            } else {
                const res = await fetch(url);
                const data = await res.json();
                console.log(JSON.parse(data.contents).results.slice(1));
                setPodcastInfo(JSON.parse(data.contents).results.slice(1));
                cache.set(url, JSON.parse(data.contents).results.slice(1));
            }
        }
    fetchData()
}, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
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
                            <CustomLink href={`/podcast/${params.id}/episode/${podcast.trackId}`}>
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
    </Suspense>
    );
}